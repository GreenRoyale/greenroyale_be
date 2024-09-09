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

    return user;
  }
  private async updateUser(userId: string, updatePayload: UserUpdatePayload) {
    const user = await this.fetchUserRecord(userId, "userId");
    if (!user) {
      return null;
    }
    Object.assign(user, updatePayload);
    return await user.save();
  }

  async updateUserProfilePicture({
    payload,
    userId,
  }: {
    payload: IUserProfilePicturePayload;
    userId: string;
  }) {
    const user = this.fetchUserRecord(userId, "userId");
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const updateResponse = await this.updateUser(userId, payload);

    if (!updateResponse) {
      throw new ClientError("Error occured updating user profile picture");
    }
    return updateResponse;
  }

  async updateUserProfile({
    payload,
    userId,
  }: {
    payload: any;
    userId: string;
  }) {
    const user = this.updateUser(userId, payload);
    if (!user) {
      throw new NotFoundError("");
    }
  }
}
