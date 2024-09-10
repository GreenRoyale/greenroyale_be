import argon from "argon2";
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import crypto from "crypto";
import { Column, Entity } from "typeorm";
import ExtendedBaseEntity from "./base.entity";

@Entity({ name: "user_tbl" })
class User extends ExtendedBaseEntity {
  @Column({ nullable: false })
  @IsString()
  first_name: string;

  @Column({ nullable: false })
  @IsString()
  last_name: string;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @IsString()
  password: string;

  @Column({ default: false })
  @IsBoolean()
  is_verified: boolean;

  @Column({ type: "int", default: 1 })
  @IsInt()
  password_version: number;

  @Column({ nullable: true })
  @ValidateIf((o) => !o.is_verified)
  @IsOptional()
  verification_token: string | null;

  @Column({ nullable: true })
  @IsOptional()
  password_reset_token: string | null;

  @Column({ type: "timestamp", nullable: true })
  @IsOptional()
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
