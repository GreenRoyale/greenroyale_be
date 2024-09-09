import { User } from "../entities/user.entity";
import { ClientError } from "../exceptions/clientError";
import { NotFoundError } from "../exceptions/notFoundError";
import { IUserProfilePicturePayload, UserUpdatePayload } from "../interfaces";

export class UserService {
  async fetchUserRecord(
    userIdentifier: string,
    type: "userId" | "email",
  ): Promise<User | null> {
    let user: User | null = null;
    if (type === "email") {
      user = await User.findOne({ where: { email: userIdentifier } });
    } else if (type === "userId") {
      user = await User.findOne({ where: { id: userIdentifier } });
    } else {
      throw new ClientError("Invalid type provided");
    }

    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
  private async updateUser(
    userId: string,
    updatePayload: UserUpdatePayload,
  ): Promise<User> {
    const user = await this.fetchUserRecord(userId, "userId");
    Object.assign(user, updatePayload);
    try {
      return await user.save();
    } catch (error) {
      throw new ClientError("Error saving user data");
    }
  }

  async updateUserProfilePicture({
    payload,
    userId,
  }: {
    payload: IUserProfilePicturePayload;
    userId: string;
  }): Promise<User> {
    return await this.updateUser(userId, {
      photo: payload.photo,
    });
  }

  async updateUserProfile({
    payload,
    userId,
  }: {
    payload: any;
    userId: string;
  }): Promise<User> {
    return this.updateUser(userId, payload);
  }
}
