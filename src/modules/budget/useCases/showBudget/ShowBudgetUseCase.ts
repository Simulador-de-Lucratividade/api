import { inject, injectable } from "tsyringe";
import { BudgetRepository } from "../../infra/typeorm/repositories/BudgetRepository";

@injectable()
export class ShowBudgetUseCase {
    constructor(
        @inject(BudgetRepository)
        private budgetRepository: BudgetRepository
    ){}

    async execute(id: string) {
        const budget = await this.budgetRepository.findById(id);

        if (!budget) {
            throw new Error('Orçamento não encontrado');
        }

        return budget;
    }
}