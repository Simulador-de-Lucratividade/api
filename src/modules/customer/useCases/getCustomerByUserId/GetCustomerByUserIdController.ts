import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCustomerByUserIdUseCase } from "./GetCustomerByUserIdUseCase";

class GetCustomerByUserIdController {
  async handle(request: Request, response: Response): Promise<void> {
    const user = request.user;

    if (!user) throw new Error("Usuário não encontrado");

    try {
      const getCustomerByUserIdUseCase = container.resolve(
        GetCustomerByUserIdUseCase
      );
      const customer = await getCustomerByUserIdUseCase.execute(user.id);

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

export default GetCustomerByUserIdController;
