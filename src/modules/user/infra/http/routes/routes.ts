import { Router } from "express";
import CreateUserController from "../../../useCases/create/CreateUserController";
import ShowUserController from "../../../useCases/showUser/ShowUserController";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthentication";

const userRouter = Router();

const createUserController = new CreateUserController();
const showUserController = new ShowUserController();

userRouter.post("/user", createUserController.handle);
userRouter.get(
  "/user/:user_id",
  ensureAuthenticated,
  showUserController.handle
);

export default userRouter;
