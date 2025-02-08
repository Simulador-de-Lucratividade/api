import { inject, injectable } from "tsyringe";
import { CustomerRepository } from "../../infra/typeorm/repositories/CustomerRepository";

@injectable()
export class GetCustomersByUserIdUseCase {
  constructor(
    @inject(CustomerRepository)
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute(userId: string) {
    const customer = await this.customerRepository.findByUserId(userId);

    if (!customer) {
      throw new Error("Cliente não encontrado");
    }

    return customer;
  }
}
