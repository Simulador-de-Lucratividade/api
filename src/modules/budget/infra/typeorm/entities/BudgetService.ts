import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Budget } from "./Budget";
import { Service } from "../../../../services/infra/typeorm/entities/Service";

@Entity("budget_services")
export class BudgetService {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  budget_id!: string;

  @ManyToOne(() => Budget, (budget) => budget.services, { onDelete: "CASCADE" })
  @JoinColumn({ name: "budget_id" })
  budget!: Budget;

  @Column()
  service_id!: string;

  @ManyToOne(() => Service)
  @JoinColumn({ name: "service_id" })
  service!: Service;

  @Column("decimal", { precision: 10, scale: 2 })
  cost!: number;

  @Column("int", { default: 1 })
  quantity!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  total_cost!: number;
}
