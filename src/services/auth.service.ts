import argon from "argon2";
import crypto from "crypto";
import { EntityManager, MoreThan } from "typeorm";
import AppDataSource from "../datasource";
import { User } from "../entities/user.entity";
import { ClientError } from "../exceptions/clientError";
import { ConflictError } from "../exceptions/conflictError";
import { UnauthorizedError } from "../exceptions/unauthorizedError";
import { IUserSignUp } from "../interfaces";
import { ILoginSchema } from "../schemas/user";
import { addEmailToQueue } from "../utils/queue";

export class AuthService {
  public async createUser(
    payload: IUserSignUp,
  ): Promise<{ user: Partial<User>; message: string }> {
    const { first_name, last_name, email, password } = payload;

    return await AppDataSource.transaction(
      async (createUserManager: EntityManager) => {
        const existingUser = await createUserManager.findOne(User, {
          where: { email },
        });

        if (existingUser) {
          throw new ConflictError("User already exists");
        }

        const hashedPassword = await argon.hash(password);

        const user = new User();
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.password = hashedPassword;
        user.is_verified = false;

        const verificationToken = user.generateToken("verification");

        const newUser = await createUserManager.save(user);

        const emailData = {
          to: newUser.email,
          subject: "Verify your account",
          template: "verify-email",
          variables: {
            verificationToken,
          },
        };

        // FIXME: This won't work because there is no email template for it
        // Comment this line out if you want to test the endpoint
        await addEmailToQueue(emailData);

        delete newUser.password;
        delete newUser.password_version;
        delete newUser.deleted_at;
        delete newUser.verification_token;
        delete newUser.password_reset_token;
        delete newUser.token_expiry;

        return { user: newUser, message: "User created successfully" };
      },
    );
  }

  public async loginUser(
    payload: ILoginSchema,
  ): Promise<{ user: Partial<User>; message: string }> {
    const { email, password } = payload;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.isCorrectPassword(password))) {
      throw new UnauthorizedError("Incorrect email or password");
    }

    delete user.password;
    delete user.password_version;
    delete user.deleted_at;
    delete user.verification_token;
    delete user.password_reset_token;
    delete user.token_expiry;

    return { user, message: "Login successful" };
  }

  public async verifyEmail(token: string): Promise<{ message: string }> {
    const user = await User.findOne({ where: { verification_token: token } });

    if (!user) {
      throw new UnauthorizedError("Invalid or expired verification token");
    }

    if (!user.isTokenValid("verification", token)) {
      throw new UnauthorizedError("Verification token has expired");
    }

    user.is_verified = true;
    user.verification_token = null;
    user.token_expiry = null;

    await user.save();

    return { message: "Email verified successfully" };
  }

  public async resendVerificationEmail(
    userId: string,
  ): Promise<{ message: string }> {
    const user = await User.findOne({ where: { id: userId } });

    if (user.is_verified) {
      throw new UnauthorizedError("User already verified");
    }

    const verificationToken = user.generateToken("verification");
    await user.save();

    const emailData = {
      to: user.email,
      subject: "Verify your account",
      template: "verify-email",
      variables: {
        verificationToken,
      },
    };

    // FIXME: This won't work because there is no email template for it
    // Comment this line out if you want to test the endpoint
    await addEmailToQueue(emailData);

    return { message: "Verification email has been resent" };
  }

  public async forgotPassword(
    email: string,
    resetUrl: string,
  ): Promise<{ message: string }> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new ClientError("User not found");
    }

    const resetToken = user.generateToken("password_reset");
    await user.save();

    const emailData = {
      to: user.email,
      subject: "Reset your password",
      template: "password-reset",
      variables: {
        resetUrl: resetUrl + `${resetToken}`,
      },
    };

    // FIXME: This won't work because there is no email template for it
    // Comment this line out if you want to test the endpoint
    await addEmailToQueue(emailData);

    return { message: "Password reset link sent successfully" };
  }

  public async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ user: Partial<User>; message: string }> {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const hashedPassword = await argon.hash(newPassword);

    const user = await User.findOne({
      where: {
        password_reset_token: hashedToken,
        token_expiry: MoreThan(new Date()),
      },
    });

    if (!user) {
      throw new ClientError("Token is invalid or has expired");
    }

    user.password = hashedPassword;
    user.password_reset_token = null;
    user.token_expiry = null;
    user.password_version += 1;

    await user.save();

    delete user.password;
    delete user.password_version;
    delete user.deleted_at;
    delete user.verification_token;
    delete user.password_reset_token;
    delete user.token_expiry;

    return { user, message: "Password reset successfully" };
  }
}
