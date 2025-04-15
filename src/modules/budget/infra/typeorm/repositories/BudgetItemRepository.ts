import { injectable } from "tsyringe";
import type { Repository } from "typeorm";
import { BudgetItem } from "../entities/BudgetItem";
import { AppDataSource } from "../../../../../shared/infra/database/data-source";

@injectable()
export class BudgetItemRepository {
  private ormRepository: Repository<BudgetItem>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(BudgetItem);
  }

  async findByBudgetId(budget_id: string): Promise<BudgetItem[]> {
    return this.ormRepository.find({
      where: { budget_id },
      relations: ["product"],
    });
  }

  async deleteByBudgetId(budget_id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .from(BudgetItem)
      .where("budget_id = :budget_id", { budget_id })
      .execute();
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(budgetItem: BudgetItem): Promise<BudgetItem> {
    return await this.ormRepository.save(budgetItem);
  }
}
