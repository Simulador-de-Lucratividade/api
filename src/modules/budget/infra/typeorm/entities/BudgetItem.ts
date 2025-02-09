import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Budget } from "./Budget";
import { Product } from "../../../../product/infra/typeorm/entities/Product";

@Entity("budget_items")
export class BudgetItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  budget_id!: string;

  @ManyToOne(() => Budget, (budget) => budget.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "budget_id" })
  budget!: Budget;

  @Column()
  product_id!: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column("decimal", { precision: 10, scale: 2 })
  unit_price!: number;

  @Column("int")
  quantity!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  total_price!: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  discount?: number;
}
