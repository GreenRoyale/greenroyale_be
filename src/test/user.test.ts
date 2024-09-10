import { User } from "../entities/user.entity";
import { NotFoundError } from "../exceptions/notFoundError";
import { UserService } from "../services/user.service";

jest.mock("../entities/user.entity.ts");
describe("UserService - fetchUserRecord", () => {
  let userService: UserService;
  beforeEach(() => {
    userService = new UserService();
  });

  it("should return null if user is not found", async () => {
    const userService = new UserService();
    await expect(userService.fetchUserRecord("123", "userId")).rejects.toThrow(
      NotFoundError,
    );
  });

  it("Should fetch a user by userId", async () => {
    const mockUser = { id: "123", email: "test@example.com" } as any;

    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    const user = await userService.fetchUserRecord("123", "userId");
    expect(user).toEqual(mockUser);
    expect(User.findOne).toHaveBeenCalledWith({
      where: {
        id: "123",
      },
    });
  });
});

describe("UserService - updateUserProfilePicture", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  it("should update user's profile picture", async () => {
    const mockUser = {
      id: "123",
      photo: "https://example.com",
      save: jest.fn(),
    } as any;
    const newProfilePicture = { photo: "https://new.example.com" };
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    await userService.updateUserProfilePicture({
      userId: "123",
      payload: newProfilePicture,
    });
    expect(mockUser.photo).toEqual(newProfilePicture.photo);
    expect(mockUser.save).toHaveBeenCalled();
  });

  it("should throw NotFoundError if user is not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    await expect(
      userService.updateUserProfilePicture({
        userId: "123",
        payload: { photo: "https://new.example.com" },
      }),
    ).rejects.toThrow(NotFoundError);
  });
});

describe("UserService - updateUserProfile", () => {
  let userService: UserService;
  beforeEach(() => {
    userService = new UserService();
  });

  it("should update user's profile details", async () => {
    const mockUser = { id: "123", last_name: "Portfolio", save: jest.fn() };
    const newProfile = { last_name: "Portofino" };
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    await userService.updateUserProfile({
      payload: newProfile,
      userId: "123",
    });
    expect(mockUser.last_name).toEqual(newProfile.last_name);
    expect(mockUser.save).toHaveBeenCalled();
  });

  it("should throw NotFoundError if user is not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    await expect(
      userService.updateUserProfile({
        payload: { last_name: "Portofino" },
        userId: "123",
      }),
    ).rejects.toThrow(NotFoundError);
  });
});
