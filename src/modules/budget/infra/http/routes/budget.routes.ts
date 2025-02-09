import { Router } from "express";
import CreateBudgetController from "../../../useCases/createBudget/CreateBudgetController";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthentication";
import GetBudgetsByUserIdController from "../../../useCases/getBudgetsByUserId/GetBudgetsByUserIdController";
import ShowBudgetController from "../../../useCases/showBudget/ShowBudgetController";
import EditBudgetController from "../../../useCases/editBudget/EditBudgetController";
import DeleteBudgetController from "../../../useCases/deleteBudget/DeleteBudgetController";
import CalculateProfitabilityController from "../../../useCases/calculateProfitability/CalculateProfitabilityController";

const budgetRouter = Router();

const createBudgetController = new CreateBudgetController();

const getBudgetsByUserIdController = new GetBudgetsByUserIdController();

const showBudgetController = new ShowBudgetController();

const editBudgetController = new EditBudgetController();

const deleteBudgetController = new DeleteBudgetController();

const calculateProfitabilityController = new CalculateProfitabilityController();

budgetRouter.post(
  "/budget",
  ensureAuthenticated,
  createBudgetController.handle
);

budgetRouter.get(
  "/budget",
  ensureAuthenticated,
  getBudgetsByUserIdController.handle
);

budgetRouter.get(
  "/budget/:id",
  ensureAuthenticated,
  showBudgetController.handle
);

budgetRouter.put(
  "/budget/:id",
  ensureAuthenticated,
  editBudgetController.handle
);

budgetRouter.delete(
  "/budget/:id",
  ensureAuthenticated,
  deleteBudgetController.handle
);

budgetRouter.post(
  "/budget/calculate-profitability",
  ensureAuthenticated,
  calculateProfitabilityController.handle
);

export default budgetRouter;
