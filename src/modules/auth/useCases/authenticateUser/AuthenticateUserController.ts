import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;

    try {
      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );
      const login = await authenticateUserUseCase.execute({ email, password });
      response.status(200).json({ success: true, login });
    } catch (error) {
      if (error instanceof Error) {
        response.status(401).json({ success: false, message: error.message });
      } else {
        response.status(401).json({ success: false, message: "Unknown error" });
      }
    }
  }
}

export default AuthenticateUserController;
