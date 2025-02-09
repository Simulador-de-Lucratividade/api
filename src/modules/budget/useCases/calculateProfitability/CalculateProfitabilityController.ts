import { Request, Response } from "express";
import { container } from "tsyringe";
import { CalculateProfitabilityUseCase } from "./CalculateProfitabilityUseCase";

class CalculateProfitabilityController {
  async handle(request: Request, response: Response): Promise<void> {
    const { items, total_value, other_costs } = request.body;

    try {
      const calculateProfitabilityUseCase = container.resolve(
        CalculateProfitabilityUseCase
      );
      const profitability = await calculateProfitabilityUseCase.execute({
        items,
        total_value,
        other_costs,
      });

      response.status(200).json({ success: true, profitability });
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

export default CalculateProfitabilityController;
