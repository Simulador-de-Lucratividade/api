import { Request, Response } from "express";
import { ShowCustomerUseCase } from "./ShowCustomerUseCase";
import { container } from "tsyringe";

class ShowCustomerController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const showCustomerUseCase = container.resolve(ShowCustomerUseCase);
      const customer = await showCustomerUseCase.execute(id);
      response.status(200).json({ success: true, customer });
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

export default ShowCustomerController;
