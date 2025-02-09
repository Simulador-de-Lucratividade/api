import { injectable } from "tsyringe";
import { IServiceRepository } from "./IServiceRepository";
import { ICreateServiceDTO } from "../../../dto/ICreateServiceDTO";
import { Service } from "../entities/Service";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/database/data-source";

@injectable()
export class ServiceRepository implements IServiceRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Service);
  }

  async create(data: ICreateServiceDTO): Promise<Service> {
    const service = await this.ormRepository.create(data);
    return this.ormRepository.save(service);
  }

  async delete(id: string): Promise<void> {
    return await this.ormRepository.delete(id).then();
  }

  async findAll(): Promise<Service[]> {
    return await this.ormRepository.find();
  }

  async findById(id: string): Promise<Service | undefined> {
    const service = await this.ormRepository.findOne({ where: { id } });
    return service || undefined;
  }

  async findByUserId(user_id: string): Promise<Service[] | undefined> {
    const service = await this.ormRepository.find({ where: { user_id } });
    return service || undefined;
  }

  update(data: Service): Promise<Service> {
    return this.ormRepository.save(data);
  }
}
