import { injectable } from "tsyringe";
import { IUserRepository } from "./IUserRepository";
import { User } from "../entities/User";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/database/data-source";
import { ICreateUserDTO } from "../../../dto/ICreateUserDTO";
import { IUserDTO } from "../../../dto/IUserDTO";

@injectable()
export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.ormRepository.find();
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });
    return user || undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user || undefined;
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }
}
