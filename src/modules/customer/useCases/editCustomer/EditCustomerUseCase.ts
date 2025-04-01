import { inject, injectable } from "tsyringe";
import { CustomerRepository } from "../../infra/typeorm/repositories/CustomerRepository";
import { IEditCustomerDTO } from "../../dto/IEditCustomerDTO";
import { Customer } from "../../infra/typeorm/entities/Customer";

@injectable()
export class EditCustomerUseCase {
  constructor(
    @inject(CustomerRepository)
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute({
    id,
    email,
    name,
    phone,
    address,
    city,
    state,
    zip_code,
    country,
  }: IEditCustomerDTO): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new Error("Cliente não encontrado");
    }

    customer.email = email;
    customer.name = name;
    customer.phone = phone;
    customer.address = address;
    customer.city = city;
    customer.state = state;
    customer.zip_code = zip_code;
    customer.country = country;

    try {
      const updatedCustomer = await this.customerRepository.update(customer);
      return updatedCustomer;
    } catch {
      throw new Error("Erro ao editar cliente");
    }
  }
}
