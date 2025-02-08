import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowProductUseCase } from "./ShowProductUseCase";

class ShowProductController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const showProductUseCase = container.resolve(ShowProductUseCase);
      const product = await showProductUseCase.execute(id);
      response.status(200).json({ success: true, product });
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

export default ShowProductController;
