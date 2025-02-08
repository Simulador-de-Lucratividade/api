import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../../../user/infra/typeorm/entities/User";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({type: "text", nullable: true})
  description?: string;

  @Column({ nullable: true })
  reference_code?: string;

  @Column("decimal", { precision: 10, scale: 2 })
  acquisition_cost!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  sale_price!: number;

  @Column()
  user_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @CreateDateColumn({ type: "timestamp", default: () => "now()" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "now()" })
  updated_at!: Date;
}
