import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<void> {
    const { name, email, phone, address, city, state, zip_code, country } =
      request.body;
    const user = request.user;

    if (!user) throw new Error("Usuário não encontrado");

    try {
      const createCustomerUseCase = container.resolve(CreateCustomerUseCase);
      const customer = await createCustomerUseCase.execute({
        name,
        email,
        phone,
        address,
        city,
        state,
        zip_code,
        country,
        user_id: user.id,
      });
      response.status(201).json({ success: true, customer });
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

export default CreateCustomerController;
