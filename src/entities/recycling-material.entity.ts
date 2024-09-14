import { Column, Entity, OneToMany } from "typeorm";
import ExtendedBaseEntity from "./base.entity";
import { Recycling } from "./recycling.entity";

export enum RECYCLINGMATERIALENUM {
  "PLASTIC" = "plastic",
  "TIN" = "tin",
  "BOTTLE" = "bottle",
  "OTHERS" = "others",
}

@Entity({ name: "recycling_material_tbl" })
export class RecyclingMaterial extends ExtendedBaseEntity {
  @Column({ type: "enum", enum: RECYCLINGMATERIALENUM })
  materialType: RECYCLINGMATERIALENUM;

  @OneToMany(() => Recycling, (userRecycling) => userRecycling.material)
  recycling_records: Recycling[];
}
