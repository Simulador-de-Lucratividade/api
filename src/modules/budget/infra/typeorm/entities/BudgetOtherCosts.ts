import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Budget } from "./Budget";

@Entity("budget_other_costs")
export class BudgetOtherCost {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  budget_id!: string;

  @ManyToOne(() => Budget, (budget) => budget.other_costs, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "budget_id" })
  budget!: Budget;

  @Column()
  description!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number;

  @Column({
    type: "enum",
    enum: ["fixed", "percentage"],
    default: "fixed",
  })
  cost_type!: "fixed" | "percentage";
}
