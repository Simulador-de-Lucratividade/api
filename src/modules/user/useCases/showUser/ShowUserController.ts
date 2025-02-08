import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowUserUseCase } from "./ShowUserUseCase";

class ShowUserController {
  async handle(request: Request, response: Response): Promise<void> {
    const { user_id } = request.params;

    try {
      const showUserUseCase = container.resolve(ShowUserUseCase);
      const user = await showUserUseCase.execute(user_id);

      response.status(200).json({ success: true, user });
    } catch (error) {
      if (error instanceof Error) {
        response.status(400).json({ success: false, message: error.message });
      } else {
        response
          .status(400)
          .json({ success: false, message: "An unknown error occurred" });
      }
    }
  }
}

export default ShowUserController;
