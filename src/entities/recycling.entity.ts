import { Column, Entity, ManyToOne } from "typeorm";
import ExtendedBaseEntity from "./base.entity";
import { RECYCLINGMATERIALENUM } from "./recycling-material.entity";
import { User } from "./user.entity";

@Entity({ name: "user_recycling_tbl" })
export class Recycling extends ExtendedBaseEntity {
  @Column({
    type: "enum",
    enum: RECYCLINGMATERIALENUM,
    default: RECYCLINGMATERIALENUM.PLASTIC,
  })
  material: RECYCLINGMATERIALENUM;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => User, (user) => user.recycling_records)
  user: User;
}
