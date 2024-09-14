import { Recycling } from "../entities/recycling.entity";
import { IRecyclingSchema } from "../schemas/recycling";
import log from "../utils/logger";
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
    log.info("the code is even here in the service");
    const user = await userService.fetchUserRecord(userId, "userId");

    const recycling = new Recycling();
    // const material = new RecyclingMaterial();
    for (const item of payload.materials) {
      recycling.material = item.materialType;
      recycling.quantity = item.quantity as number;
      recycling.user = {} as any;
    }

    // const recyclingMaterial = await RecyclingMaterial.save(material);
    const recyclingResponse = await Recycling.save(recycling);

    return {
      message: "Recycling log created successfully",
      record: {
        recycling: recyclingResponse,
        // recyclingMaterial,
      },
    };
  }
}
