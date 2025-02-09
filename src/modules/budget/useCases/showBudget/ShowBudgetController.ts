import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowBudgetUseCase } from "./ShowBudgetUseCase";

class ShowBudgetController {
    async handle(request: Request, response: Response): Promise<void> {
        const {id} = request.params
        
        try {
            const showBudgetUseCase = container.resolve(ShowBudgetUseCase)
            const budget = await showBudgetUseCase.execute(id)

            response.status(200).json({success: true, budget})
        }catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ success: false, message: error.message });
            } else {
                response
                .status(400)
                .json({ success: false, message: "Erro desconhecido" });
            }
        }
    }
}

export default ShowBudgetController