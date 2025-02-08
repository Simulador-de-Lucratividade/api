import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("user_tokens")
export class UserToken {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  refresh_token!: string;

  @Column()
  user_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "timestamp" })
  expires_date!: Date;
}
