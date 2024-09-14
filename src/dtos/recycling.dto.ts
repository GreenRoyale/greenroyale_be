import { Recycling } from "../entities/recycling.entity";
import { ClientError } from "../exceptions/clientError";

export const recyclingDTO = (data: Recycling[]) => {
  try {
    const recyclingDTO = data.map((item) => {
      return {
        ...item,
        user: item.user.id,
      };
    });

    return recyclingDTO;
  } catch (error) {
    throw new ClientError("Error converting recycling DTO");
  }
};
