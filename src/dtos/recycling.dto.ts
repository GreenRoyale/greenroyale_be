import { Recycling } from "../entities/recycling.entity";

export const recyclingDTO = (data: Recycling[]) => {
  const recyclingDTO = data.map((item) => {
    return {
      ...item,
      user: item.user.id,
    };
  });

  return recyclingDTO;
};
