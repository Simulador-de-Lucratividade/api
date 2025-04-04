import { inject, injectable } from "tsyringe";
import { ICreateCustomerDTO } from "../../dto/ICreateCustomerDTO";
import { Customer } from "../../infra/typeorm/entities/Customer";
import { CustomerRepository } from "../../infra/typeorm/repositories/CustomerRepository";
import { UserRepository } from "../../../user/infra/typeorm/repositories/UserRepository";

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject(CustomerRepository)
    private readonly customerRepository: CustomerRepository,

    @inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async execute({
    name,
    email,
    phone,
    address,
    city,
    state,
    zip_code,
    country,
    user_id,
  }: ICreateCustomerDTO): Promise<Customer> {
    const userExists = await this.userRepository.findById(user_id);

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    try {
      const customer = await this.customerRepository.create({
        name,
        email,
        phone,
        address,
        city,
        state,
        zip_code,
        country,
        user_id,
      });

      return customer;
    } catch {
      throw new Error("Erro ao cadastrar cliente");
    }
  }
}
