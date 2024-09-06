import { Column, Entity } from "typeorm";
import ExtendedBaseEntity from "./base.entity";

@Entity({ name: "user_tbl" })
class User extends ExtendedBaseEntity {
  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  is_verified: boolean;
}

export { User };
