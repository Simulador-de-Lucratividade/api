import { Router } from "express";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthentication";
import CreateProductController from "../../../useCases/createProduct/CreateProductController";
import DeleteProductController from "../../../useCases/deleteProduct/DeleteProductController";
import EditProductController from "../../../useCases/editProduct/EditProductController";
import ShowProductController from "../../../useCases/showProduct/ShowProductController";
import GetProductsByUserIdController from "../../../useCases/getProductsByUserId/GetProductsByUserIdController";

const productRouter = Router();

const createProductController = new CreateProductController();

const getProductsByUserIdController = new GetProductsByUserIdController();

const showProductController = new ShowProductController();

const editProductController = new EditProductController();

const deleteProductController = new DeleteProductController()

productRouter.post(
  "/product",
  ensureAuthenticated,
  createProductController.handle
);

productRouter.get(
  "/product",
  ensureAuthenticated,
  getProductsByUserIdController.handle
);

productRouter.get(
  "/product/:id",
  ensureAuthenticated,
  showProductController.handle
);

productRouter.put(
  "/product/:id",
  ensureAuthenticated,
  editProductController.handle
);

productRouter.delete(
  "/product/:id",
  ensureAuthenticated,
  deleteProductController.handle
);

export default productRouter;
