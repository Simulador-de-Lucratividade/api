import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { BudgetService } from "../entities/BudgetService";
import { AppDataSource } from "../../../../../shared/infra/database/data-source";

@injectable()
export class BudgetServiceRepository {
  private ormRepository: Repository<BudgetService>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(BudgetService);
  }

  async findByBudgetId(budget_id: string): Promise<BudgetService[]> {
    return this.ormRepository.find({
      where: { budget_id },
      relations: ["service"],
    });
  }

  async deleteByBudgetId(budget_id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .from(BudgetService)
      .where("budget_id = :budget_id", { budget_id })
      .execute();
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(budgetService: BudgetService): Promise<BudgetService> {
    return await this.ormRepository.save(budgetService);
  }
}
