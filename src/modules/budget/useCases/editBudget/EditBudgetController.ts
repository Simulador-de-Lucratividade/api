import { Request, Response } from "express";
import { container } from "tsyringe";
import { EditBudgetUseCase } from "./EditBudgetUseCase";

class EditBudgetController {
  async handle(request: Request, response: Response): Promise<void> {
    const { issue_date, validity_date, total_value, status, items } =
      request.body;
    const { id } = request.params;

    try {
      const editBudgetUseCase = container.resolve(EditBudgetUseCase);
      const budget = await editBudgetUseCase.execute({
        id,
        issue_date,
        validity_date,
        total_value,
        status,
        items,
      });

      response.status(200).json({ success: true, budget });
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

export default EditBudgetController;
