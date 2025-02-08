import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserProfiles } from "./UserProfile";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "email", unique: true })
  email!: string;

  @Column({ name: "password" })
  password!: string;

  @Column({ name: "document" })
  document!: string;

  @Column({
    enum: UserProfiles,
    type: "enum",
    name: "profile",
    default: UserProfiles.USER,
  })
  profile!: string;

  @Column({ name: "status", default: "active" })
  status!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp", default: "now()" })
  created_at!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: "now()" })
  updated_at!: Date;
}
