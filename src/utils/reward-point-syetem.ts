import { RECYCLINGMATERIALENUM } from "../entities/recycling-material.entity";

const rewardPointSystem = (value: RECYCLINGMATERIALENUM) => {
  let points = 0;
  switch (value) {
    case RECYCLINGMATERIALENUM.BOTTLE:
      points = 0.5;
      break;
    case RECYCLINGMATERIALENUM.PLASTIC:
      points = 0.4;
      break;
    case RECYCLINGMATERIALENUM.TIN:
      points = 0.3;
      break;
    case RECYCLINGMATERIALENUM.OTHERS:
      points = 0.2;
      break;
    default:
      break;
  }

  return points;
};

export default rewardPointSystem;
