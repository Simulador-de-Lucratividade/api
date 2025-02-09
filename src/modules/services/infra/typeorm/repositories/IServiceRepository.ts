import { ICreateServiceDTO } from "../../../dto/ICreateServiceDTO";
import { Service } from "../entities/Service";

export interface IServiceRepository {
  findAll(): Promise<Service[]>;
  findById(id: string): Promise<Service | undefined>;
  findByUserId(user_id: string): Promise<Service[] | undefined>;
  create(data: ICreateServiceDTO): Promise<Service>;
  update(data: Service): Promise<Service>;
  delete(id: string): Promise<void>;
}
