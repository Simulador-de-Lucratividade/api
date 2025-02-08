import { Router } from "express";
import CreateCustomerController from "../../../useCases/createCustomer/CreateCustomerController";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthentication";
import GetCustomerByUserIdController from "../../../useCases/getCustomersByUserId/GetCustomersByUserIdController";
import ShowCustomerController from "../../../useCases/showCustomer/ShowCustomerController";
import EditCustomerController from "../../../useCases/editCustomer/EditCustomerController";
import DeleteCustomerController from "../../../useCases/deleteCustomer/DeleteCustomerController";

const customerRouter = Router();

const createCustomerController = new CreateCustomerController();

const getCustomersByUserIdController = new GetCustomerByUserIdController();

const showCustomerController = new ShowCustomerController();

const editCustomerController = new EditCustomerController();

const deleteCustomerController = new DeleteCustomerController()

customerRouter.post(
  "/customer",
  ensureAuthenticated,
  createCustomerController.handle
);

customerRouter.get(
  "/customer",
  ensureAuthenticated,
  getCustomersByUserIdController.handle
);

customerRouter.get(
  "/customer/:id",
  ensureAuthenticated,
  showCustomerController.handle
);

customerRouter.put(
  "/customer/:id",
  ensureAuthenticated,
  editCustomerController.handle
);

customerRouter.delete(
  "/customer/:id",
  ensureAuthenticated,
  deleteCustomerController.handle
);

export default customerRouter;
