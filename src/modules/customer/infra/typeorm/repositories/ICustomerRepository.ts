import { ICreateCustomerDTO } from "../../../dto/ICreateCustomerDTO";
import { Customer } from "../entities/Customer";

export interface ICustomerRepository {
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer | undefined>;
  findByUserId(user_id: string): Promise<Customer[] | undefined>;
  findByEmail(email: string): Promise<Customer | undefined>;
  create(data: ICreateCustomerDTO): Promise<Customer>;
}
