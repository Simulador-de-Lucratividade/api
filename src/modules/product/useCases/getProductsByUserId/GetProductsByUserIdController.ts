import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetProductsByUserIdUseCase } from "./GetProductsByUserIdUseCase";

class GetProductsByUserIdController {
  async handle(request: Request, response: Response): Promise<void> {
    const user = request.user;

    if (!user) throw new Error("Usuário não encontrado");

    try {
      const getProductsByUserIdUseCase = container.resolve(
        GetProductsByUserIdUseCase
      );
      const product = await getProductsByUserIdUseCase.execute(user.id);

      response.status(200).json({ product });
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

export default GetProductsByUserIdController;
