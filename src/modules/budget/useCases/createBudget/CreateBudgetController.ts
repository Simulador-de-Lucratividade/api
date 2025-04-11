import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateBudgetUseCase } from "./CreateBudgetUseCase";

class CreateBudgetController {
  async handle(request: Request, response: Response): Promise<void> {
    const {
      customer_id,
      issue_date,
      validity_date,
      total_value,
      status,
      items,
      services,
      other_costs,
      title,
      observations,
    } = request.body;
    const user = request.user;

    if (!user) throw new Error("Usuário não encontrado");

    try {
      const createBudgetUseCase = container.resolve(CreateBudgetUseCase);
      const budget = await createBudgetUseCase.execute({
        customer_id,
        issue_date,
        validity_date,
        total_value,
        status,
        items,
        services,
        other_costs,
        title,
        observations,
        user_id: user.id,
      });

      response.status(201).json({ success: true, budget });
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

export default CreateBudgetController;
