import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteServiceUseCase } from "./DeleteServiceUseCase";

class DeleteServiceController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const deleteServiceUseCase = container.resolve(DeleteServiceUseCase);
      await deleteServiceUseCase.execute(id);

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

export default DeleteServiceController;
