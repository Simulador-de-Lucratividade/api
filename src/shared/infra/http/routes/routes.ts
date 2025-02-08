import { Router } from "express";
import userRouter from "../../../../modules/user/infra/http/routes/routes";
import authRouter from "../../../../modules/auth/infra/http/routes/auth.routes";
import customerRouter from "../../../../modules/customer/infra/http/routes/customer.routes";
import productRouter from "../../../../modules/product/infra/http/routes/product.routes";

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(customerRouter);
router.use(productRouter);

export default router;
