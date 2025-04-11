import { inject, injectable } from "tsyringe";
import { BudgetRepository } from "../../infra/typeorm/repositories/BudgetRepository";
import { ICreateBudgetDTO } from "../../dto/ICreateBudgetDTO";
import { Budget } from "../../infra/typeorm/entities/Budget";

@injectable()
export class CreateBudgetUseCase {
  constructor(
    @inject(BudgetRepository)
    private readonly budgetRepository: BudgetRepository
  ) {}

  async execute(data: ICreateBudgetDTO): Promise<Budget> {
    const budget = await this.budgetRepository.create(data);
    if (!budget) {
      throw new Error("Falha ao criar orçamento");
    }

    return budget;
  }
}
