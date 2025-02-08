import { injectable } from "tsyringe";
import { ICustomerRepository } from "./ICustomerRepository";
import { Repository } from "typeorm";
import { Customer } from "../entities/Customer";
import { AppDataSource } from "../../../../../shared/infra/database/data-source";
import { ICreateCustomerDTO } from "../../../dto/ICreateCustomerDTO";

@injectable()
export class CustomerRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.ormRepository.find();
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({ where: { email } });
    return customer || undefined;
  }

  async findByUserId(user_id: string): Promise<Customer[] | undefined> {
    const customer = await this.ormRepository.find({ where: { user_id } });
    return customer || undefined;
  }

  async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({ where: { id } });
    return customer || undefined;
  }

  async create(data: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create(data);
    await this.ormRepository.save(customer);
    return customer;
  }

  async update(data: Customer): Promise<Customer> {
      return this.ormRepository.save(data)
  }

  async delete(id: string): Promise<void> {
      await this.ormRepository.delete(id)
  }
}
