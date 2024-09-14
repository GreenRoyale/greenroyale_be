import { recyclingDTO } from "../dtos/recycling.dto";
import { Recycling } from "../entities/recycling.entity";
import { IRecyclingDTO } from "../interfaces";
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
    record: { recycling?: IRecyclingDTO[] };
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
    const DTOResponse = recyclingDTO(recycling);
    return {
      message: "Recycling log created successfully",
      record: {
        recycling: DTOResponse,
      },
    };
  }

  public async fetchAllRecyclingLog(): Promise<IRecyclingDTO[] | null> {
    const recycling = await Recycling.find({ relations: ["user"] });
    const DTOResponse = recyclingDTO(recycling);
    return DTOResponse;
  }

  public async fetchRecyclingLogById(
    recycleId: string,
  ): Promise<IRecyclingDTO | null> {
    const recycling = await Recycling.findOne({
      where: { id: recycleId },
      relations: ["user"],
    });
    const DTOResponse = recyclingDTO([recycling])[0];
    return DTOResponse;
  }
}
