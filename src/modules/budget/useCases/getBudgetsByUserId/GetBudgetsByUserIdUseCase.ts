import { inject, injectable } from "tsyringe";
import { BudgetRepository } from "../../infra/typeorm/repositories/BudgetRepository";
import { Budget } from "../../infra/typeorm/entities/Budget";

@injectable()
export class GetBudgetsByUserIdUseCase {
    constructor(
        @inject(BudgetRepository)
        private readonly budgetRepository: BudgetRepository
    ){}

    async execute(userId: string): Promise<Budget[]> {
        const budgets = await this.budgetRepository.findByUserId(userId);

        if(!budgets){
            throw new Error("Orçamentos não encontrados")
        }

        return budgets
    }
}