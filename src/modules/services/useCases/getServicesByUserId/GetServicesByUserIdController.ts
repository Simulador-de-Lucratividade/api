import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetServicesByUserIdUseCase } from "./GetServicesByUserIdUseCase";

class GetServicesByUserIdController {
  async handle(request: Request, response: Response): Promise<void> {
    const user = request.user;

    if (!user) throw new Error("Usuário não encontrado");

    try {
      const getServicesByUserIdUseCase = container.resolve(
        GetServicesByUserIdUseCase
      );
      const service = await getServicesByUserIdUseCase.execute(user.id);

      response.status(200).json({ success: true, service });
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

export default GetServicesByUserIdController;
