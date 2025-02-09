import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "../../modules/user/infra/typeorm/repositories/UserRepository";
import { UserTokensRepository } from "../../modules/auth/infra/typeorm/repositories/UserTokensRepository";
import { CustomerRepository } from "../../modules/customer/infra/typeorm/repositories/CustomerRepository";
import { ProductRepository } from "../../modules/product/infra/typeorm/repositories/ProductRepository";
import { BudgetRepository } from "../../modules/budget/infra/typeorm/repositories/BudgetRepository";
import { ServiceRepository } from "../../modules/services/infra/typeorm/repositories/ServiceRepository";

container.registerSingleton<UserRepository>(UserRepository);
container.registerSingleton<UserTokensRepository>(UserTokensRepository);
container.registerSingleton<CustomerRepository>(CustomerRepository);
container.registerSingleton<ProductRepository>(ProductRepository);
container.registerSingleton<BudgetRepository>(BudgetRepository);
container.registerSingleton<ServiceRepository>(ServiceRepository);
