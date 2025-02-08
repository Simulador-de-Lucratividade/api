import { inject, injectable } from "tsyringe";
import { CustomerRepository } from "../../infra/typeorm/repositories/CustomerRepository";
import { Customer } from "../../infra/typeorm/entities/Customer";
import { ICreateCustomerDTO } from "../../dto/ICreateCustomerDTO";

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject(CustomerRepository)
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute(data: ICreateCustomerDTO): Promise<Customer> {
    const customer = await this.customerRepository.create(data);

    if (!customer) {
      throw new Error("Falha ao criar cliente.");
    }

    return customer;
  }
}
