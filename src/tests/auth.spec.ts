import argon from "argon2";
import { EntityManager } from "typeorm";
import AppDataSource from "../datasource";
import { User } from "../entities/user.entity";
import { ConflictError } from "../exceptions/conflictError";
import { AuthService } from "../services/auth.service";

jest.mock("argon2");
jest.mock("../datasource");

describe("AuthService - createUser", () => {
  let authService: AuthService;
  let mockEntityManager: Partial<EntityManager>;

  beforeEach(() => {
    mockEntityManager = {
      findOne: jest.fn(),
      save: jest.fn(),
    };
    (AppDataSource.transaction as jest.Mock).mockImplementation((cb: any) =>
      cb(mockEntityManager),
    );
    authService = new AuthService();
  });

  it("should create a new user successfully", async () => {
    (mockEntityManager.findOne as jest.Mock).mockResolvedValueOnce(null);
    (mockEntityManager.save as jest.Mock).mockResolvedValueOnce({
      id: "test-id",
      first_name: "John",
      last_name: "Doe",
      email: "jdoe@example.com",
      is_verified: false,
    });

    (argon.hash as jest.Mock).mockResolvedValueOnce("hashedPassword");

    const result = await authService.createUser({
      first_name: "John",
      last_name: "Doe",
      email: "jdoe@example.com",
      password: "password123",
    });

    expect(result.user.first_name).toBe("John");
    expect(result.user.email).toBe("jdoe@example.com");
    expect(argon.hash).toHaveBeenCalledWith("password123");
    expect(mockEntityManager.save).toHaveBeenCalled();
  });

  it("should throw ConflictError if user already exists", async () => {
    (mockEntityManager.findOne as jest.Mock).mockResolvedValueOnce({
      id: "existing-id",
      email: "jdoe@example.com",
    } as User);

    await expect(
      authService.createUser({
        first_name: "John",
        last_name: "Doe",
        email: "jdoe@example.com",
        password: "password123",
      }),
    ).rejects.toThrow(ConflictError);

    expect(mockEntityManager.findOne).toHaveBeenCalledWith(User, {
      where: { email: "jdoe@example.com" },
    });
  });
});
