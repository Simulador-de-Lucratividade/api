import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowServiceUseCase } from "./ShowServiceUseCase";

class ShowServiceController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const showServiceUseCase = container.resolve(ShowServiceUseCase);
      const service = await showServiceUseCase.execute(id);

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

export default ShowServiceController;
