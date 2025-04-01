import { Router } from "express";
import CreateServiceController from "../../../useCases/createService/CreateServiceController";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthentication";
import GetServicesByUserIdController from "../../../useCases/getServicesByUserId/GetServicesByUserIdController";
import ShowServiceController from "../../../useCases/showService/ShowServiceController";
import DeleteServiceController from "../../../useCases/deleteService/DeleteServiceController";
import UpdateServiceController from "../../../useCases/updateService/UpdateServiceController";

const serviceRouter = Router();

const createServiceController = new CreateServiceController();
const getServicesByUserIdController = new GetServicesByUserIdController();
const showServiceController = new ShowServiceController();
const deleteServiceController = new DeleteServiceController();
const updateServiceController = new UpdateServiceController();

serviceRouter.post(
  "/service",
  ensureAuthenticated,
  createServiceController.handle
);

serviceRouter.get(
  "/service",
  ensureAuthenticated,
  getServicesByUserIdController.handle
);

serviceRouter.get(
  "/service/:id",
  ensureAuthenticated,
  showServiceController.handle
);

serviceRouter.put(
  "/service/:id",
  ensureAuthenticated,
  updateServiceController.handle
);

serviceRouter.delete(
  "/service/:id",
  ensureAuthenticated,
  deleteServiceController.handle
);

export default serviceRouter;
