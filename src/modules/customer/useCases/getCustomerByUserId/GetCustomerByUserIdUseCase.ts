import { inject, injectable } from "tsyringe";
import { CustomerRepository } from "../../infra/typeorm/repositories/CustomerRepository";

@injectable()
export class GetCustomerByUserIdUseCase {
  constructor(
    @inject(CustomerRepository)
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute(userId: string) {
    const customer = await this.customerRepository.findByUserId(userId);

    if (!customer || customer.length === 0) {
      throw new Error("Cliente não encontrado");
    }

    return customer;
  }
}
