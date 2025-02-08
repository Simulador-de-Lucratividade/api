import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<void> {
    const { refreshToken } = request.body;
    try {
      const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
      const result = await refreshTokenUseCase.execute(refreshToken);
      response.json(result);
    } catch (error) {
      if (error instanceof Error) {
        response.status(401).json({ success: false, message: error.message });
      } else {
        response.status(401).json({ success: false, message: "Unknown error" });
      }
    }
  }
}

export default RefreshTokenController;
