import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController {
  async handle(request: Request, response: Response): Promise<void> {
    const { name, reference_code, description, acquisition_cost, sale_price} = request.body;

    const user = request.user;

    if (!user) throw new Error("Usuário não encontrado");

    try {
      const createProductUseCase = container.resolve(CreateProductUseCase);

      const product = await createProductUseCase.execute({
        name,
        reference_code,
        description,
        acquisition_cost,
        sale_price,
        user_id: user.id,
      });

      response.status(201).json({ success: true, product });
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

export default CreateProductController;
