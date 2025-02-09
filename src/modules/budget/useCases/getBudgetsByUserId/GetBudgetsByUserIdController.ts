import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetBudgetsByUserIdUseCase } from "./GetBudgetsByUserIdUseCase";

class GetBudgetsByUserIdController {
  async handle(request: Request, response: Response): Promise<void> {
    const user = request.user;

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    try {
      const getBudgetsByUserIdUseCase = container.resolve(
        GetBudgetsByUserIdUseCase
      );
      const budgets = await getBudgetsByUserIdUseCase.execute(user.id);

      response.status(200).json({ success: true, budgets });
    } catch (error) {
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

export default GetBudgetsByUserIdController;
