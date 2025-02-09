import { inject, injectable } from "tsyringe";
import { BudgetRepository } from "../../infra/typeorm/repositories/BudgetRepository";

@injectable()
export class DeleteBudgetUseCase {
  constructor(
    @inject(BudgetRepository)
    private readonly budgetRepository: BudgetRepository
  ) {}

  async execute(id: string): Promise<void> {
    const budget = await this.budgetRepository.findById(id);

    if (!budget) {
      throw new Error("Orçamento não encontrado");
    }

    await this.budgetRepository.delete(id);
  }
}
