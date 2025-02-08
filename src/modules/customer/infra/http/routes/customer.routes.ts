import { Router } from "express";
import CreateCustomerController from "../../../useCases/createCustomer/CreateCustomerController";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthentication";
import { GetCustomerByUserIdUseCase } from "../../../useCases/getCustomerByUserId/GetCustomerByUserIdUseCase";
import GetCustomerByUserIdController from "../../../useCases/getCustomerByUserId/GetCustomerByUserIdController";

const customerRouter = Router();

const createCustomerController = new CreateCustomerController();
const getCustomerByUserIdController = new GetCustomerByUserIdController();

customerRouter.post(
  "/customer",
  ensureAuthenticated,
  createCustomerController.handle
);

customerRouter.get(
  "/customer",
  ensureAuthenticated,
  getCustomerByUserIdController.handle
);

export default customerRouter;
