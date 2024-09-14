import { Recycling } from "../entities/recycling.entity";
import { IRecyclingSchema } from "../schemas/recycling";
import rewardPointSystem from "../utils/reward-point-syetem";
import { UserService } from "./user.service";

const userService = new UserService();
export class RecyclingService {
  public async createRecyclingLog(
    payload: IRecyclingSchema,
    userId: string,
  ): Promise<{
    message: string;
    record: { recycling?: any };
  }> {
    const user = await userService.fetchUserRecord(userId, "userId");

    const recyclingEntities = payload.materials.map((item) => {
      const recycling = new Recycling();
      recycling.user = user;
      recycling.material = item.materialType;
      recycling.point = rewardPointSystem(item.materialType) * item.quantity;
      recycling.quantity = item.quantity as number;
      return recycling;
    });

    const recycling = await Recycling.save(recyclingEntities);
    const recyclingDTO = recycling.map((item) => {
      return {
        ...item,
        user: item.user.id,
      };
    });
    return {
      message: "Recycling log created successfully",
      record: {
        recycling: recyclingDTO,
      },
    };
  }
}
