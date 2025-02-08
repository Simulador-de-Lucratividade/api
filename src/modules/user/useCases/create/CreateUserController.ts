import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<void> {
    const { name, email, password, document } = request.body;

    try {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      const user = await createUserUseCase.execute({
        name,
        email,
        password,
        document,
      });

      response.status(201).json(user);
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

export default CreateUserController;
