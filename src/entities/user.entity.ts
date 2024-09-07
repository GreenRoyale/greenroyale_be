import argon from "argon2";
import crypto from "crypto";
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

  @Column({ nullable: true })
  verification_token: string | null;

  @Column({ nullable: true })
  password_reset_token: string | null;

  @Column({ type: "timestamp", nullable: true })
  token_expiry: Date | null;

  async isCorrectPassword(candidatePassword: string): Promise<boolean> {
    return argon.verify(this.password, candidatePassword);
  }

  changedPasswordAfterTokenIssued(candidatePasswordVersion: number): boolean {
    return this.password_version !== candidatePasswordVersion;
  }

  generateToken(type: "verification" | "password_reset"): string {
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    if (type === "verification") {
      this.verification_token = hashedToken;
    } else if (type === "password_reset") {
      this.password_reset_token = hashedToken;
    }

    this.token_expiry = new Date(Date.now() + 15 * 60 * 1000);

    return token;
  }

  isTokenValid(
    type: "verification" | "password_reset",
    token: string,
  ): boolean {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    if (type === "verification" && this.verification_token === hashedToken) {
      return this.token_expiry && this.token_expiry > new Date();
    }

    if (
      type === "password_reset" &&
      this.password_reset_token === hashedToken
    ) {
      return this.token_expiry && this.token_expiry > new Date();
    }

    return false;
  }
}

export { User };
