import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateServiceUseCase } from "./UpdateServiceUseCase";

class UpdateServiceController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { name, description, cost } = request.body;
    const user = request.user;

    if (!user) throw new Error("Usuário não encontrado");

    try {
      const updateServiceUseCase = container.resolve(UpdateServiceUseCase);
      const service = await updateServiceUseCase.execute({
        id,
        name,
        description,
        cost,
        user_id: user.id,
      });

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

export default UpdateServiceController;
