import { Repository } from "typeorm";
import { BudgetOtherCost } from "../entities/BudgetOtherCosts";

export class BudgetOtherCostRepository extends Repository<BudgetOtherCost> {
  async findByBudgetId(budget_id: string): Promise<BudgetOtherCost[]> {
    return this.find({
      where: { budget_id },
    });
  }

  async deleteByBudgetId(budget_id: string): Promise<void> {
    await this.createQueryBuilder()
      .delete()
      .from(BudgetOtherCost)
      .where("budget_id = :budget_id", { budget_id })
      .execute();
  }
}
