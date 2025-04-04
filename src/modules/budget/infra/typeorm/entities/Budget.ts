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

// TODO - COLOCAR IDENTIFICADOR SEQUENCIAL DOS ORÇAMENTOS (EX: ORÇAMENTO Nº17)
// TODO - COLOCAR CAMPO DE TÍTULO NO ORÇAMENTO
// TODO - COLOCAR CAMPO DE OBSERVAÇÕES NO ORÇAMENTO
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

  @Column({ default: "draft" })
  status!: string; // e.g. draft, finalized, sent

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
}
