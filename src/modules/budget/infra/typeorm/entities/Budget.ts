import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Generated,
} from "typeorm";
import { Customer } from "../../../../customer/infra/typeorm/entities/Customer";
import { User } from "../../../../user/infra/typeorm/entities/User";
import { BudgetItem } from "./BudgetItem";
import { BudgetService } from "./BudgetService";
import { BudgetOtherCost } from "./BudgetOtherCosts";
import { BudgetStatusEnum } from "../../../dto/BudgetStatusEnum";

@Entity("budgets")
export class Budget {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  customer_id!: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer!: Customer;

  @Column()
  user_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "date" })
  issue_date!: Date;

  @Column({ type: "date" })
  validity_date!: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  total_value!: number;

  @Column({
    type: "enum",
    enum: BudgetStatusEnum,
    default: BudgetStatusEnum.DRAFT,
  })
  status!: BudgetStatusEnum;

  @Column()
  @Generated("increment")
  sequence_number!: number;

  @Column()
  title!: string;

  @Column()
  observations?: string;

  @CreateDateColumn({ type: "timestamp", default: () => "now()" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "now()" })
  updated_at!: Date;

  @OneToMany(() => BudgetItem, (budgetItem) => budgetItem.budget, {
    cascade: true,
    onDelete: "CASCADE",
  })
  items!: BudgetItem[];

  @OneToMany(() => BudgetService, (budgetService) => budgetService.budget, {
    cascade: true,
    onDelete: "CASCADE",
  })
  services!: BudgetService[];

  @OneToMany(
    () => BudgetOtherCost,
    (budgetOtherCost) => budgetOtherCost.budget,
    {
      cascade: true,
      onDelete: "CASCADE",
    }
  )
  other_costs!: BudgetOtherCost[];
}
