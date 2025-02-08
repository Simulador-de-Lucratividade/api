import { inject, injectable } from "tsyringe";
import { CustomerRepository } from "../../infra/typeorm/repositories/CustomerRepository";
import { Customer } from "../../infra/typeorm/entities/Customer";

@injectable()
export class ShowCustomerUseCase {
  constructor(
    @inject(CustomerRepository)
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute(customerId: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error("Cliente não encontrado");
    }

    return customer;
  }
}
