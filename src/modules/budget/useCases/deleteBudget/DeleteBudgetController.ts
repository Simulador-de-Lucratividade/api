import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteBudgetUseCase } from "./DeleteBudgetUseCase";

class DeleteBudgetController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const deleteBudgetUseCase = container.resolve(DeleteBudgetUseCase);
      await deleteBudgetUseCase.execute(id);

      response.status(200).json({ success: true });
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

export default DeleteBudgetController;
