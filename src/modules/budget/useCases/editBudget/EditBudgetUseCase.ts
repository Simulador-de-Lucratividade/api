import { inject, injectable } from "tsyringe";
import { BudgetRepository } from "../../infra/typeorm/repositories/BudgetRepository";
import { Budget } from "../../infra/typeorm/entities/Budget";
import { IEditBudgetDTO } from "../../dto/IEditBudgetDTO";

@injectable()
export class EditBudgetUseCase {
  constructor(
    @inject(BudgetRepository)
    private budgetRepository: BudgetRepository
  ) {}

  async execute(data: IEditBudgetDTO): Promise<Budget> {
      const budget = await this.budgetRepository.findById(data.id);

      if (!budget) {
        throw new Error("Budget not found");
      }

      Object.assign(budget, data);

      return this.budgetRepository.update(budget);
  }
}
