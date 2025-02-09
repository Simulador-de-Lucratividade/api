import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateServiceUseCase } from "./CreateServiceUseCase";

class CreateServiceController {
  async handle(request: Request, response: Response): Promise<void> {
    const { name, description, cost } = request.body;
    const user = request.user;

    if (!user) throw new Error("Usuário não encontrado");

    try {
      const createServiceUseCase = container.resolve(CreateServiceUseCase);

      const service = await createServiceUseCase.execute({
        name,
        description,
        cost,
        user_id: user.id,
      });

      response.status(201).json({ success: true, service });
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

export default CreateServiceController;
