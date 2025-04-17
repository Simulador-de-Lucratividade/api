import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { BudgetOtherCost } from "../entities/BudgetOtherCosts";
import { AppDataSource } from "../../../../../shared/infra/database/data-source";

@injectable()
export class BudgetOtherCostRepository {
  private ormRepository: Repository<BudgetOtherCost>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(BudgetOtherCost);
  }

  async findByBudgetId(budget_id: string): Promise<BudgetOtherCost[]> {
    return this.ormRepository.find({ where: { budget_id } });
  }

  async deleteByBudgetId(budget_id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .from(BudgetOtherCost)
      .where("budget_id = :budget_id", { budget_id })
      .execute();
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(budgetOtherCost: BudgetOtherCost): Promise<BudgetOtherCost> {
    return await this.ormRepository.save(budgetOtherCost);
  }
}
