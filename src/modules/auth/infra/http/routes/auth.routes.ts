import { Router } from "express";
import AuthenticateUserController from "../../../useCases/authenticateUser/AuthenticateUserController";
import RefreshTokenController from "../../../useCases/refreshToken/RefreshTokenController";

const authRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authRouter.post("/sessions", authenticateUserController.handle);
authRouter.post("/refresh-token", refreshTokenController.handle);

export default authRouter;
