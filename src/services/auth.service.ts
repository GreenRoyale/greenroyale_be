import argon from "argon2";
import { EntityManager } from "typeorm";
import AppDataSource from "../datasource";
import { User } from "../entities/user.entity";
import { ConflictError } from "../exceptions/conflictError";
import { UnauthorizedError } from "../exceptions/unauthorizedError";
import { IUserSignUp } from "../interfaces";
import { ILoginSchema } from "../schemas/user";

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

        const newUser = await createUserManager.save(user);

        // TODO: send email notification

        delete user.password;
        delete user.password_version;
        delete user.deleted_at;

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

    return { user, message: "Login successful" };
  }
}
