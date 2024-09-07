import argon from "argon2";
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

  @Column({ type: "int", default: 1 })
  password_version: number;

  async isCorrectPassword(candidatePassword: string): Promise<boolean> {
    return argon.verify(this.password, candidatePassword);
  }

  changedPasswordAfterTokenIssued(candidatePasswordVersion: number): boolean {
    return this.password_version !== candidatePasswordVersion;
  }
}

export { User };
