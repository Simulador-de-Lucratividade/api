import { inject, injectable } from "tsyringe";
import { ICreateCustomerDTO } from "../../dto/ICreateCustomerDTO";
import { Customer } from "../../infra/typeorm/entities/Customer";
import { CustomerRepository } from "../../infra/typeorm/repositories/CustomerRepository";

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject(CustomerRepository)
    private readonly customerRepository: CustomerRepository
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
