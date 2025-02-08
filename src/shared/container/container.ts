import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "../../modules/user/infra/typeorm/repositories/UserRepository";
import { UserTokensRepository } from "../../modules/auth/infra/typeorm/repositories/UserTokensRepository";
import { CustomerRepository } from "../../modules/customer/infra/typeorm/repositories/CustomerRepository";

container.registerSingleton<UserRepository>(UserRepository);
container.registerSingleton<UserTokensRepository>(UserTokensRepository);
container.registerSingleton<CustomerRepository>(CustomerRepository);
