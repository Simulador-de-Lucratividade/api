import { Repository } from "typeorm";
import { Budget } from "../entities/Budget";
import { IBudgetRepository } from "./IBudgetRepository";
import { ICreateBudgetDTO } from "../../../dto/ICreateBudgetDTO";
import { AppDataSource } from "../../../../../shared/infra/database/data-source";

export class BudgetRepository implements IBudgetRepository {
  private ormRepository: Repository<Budget>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Budget);
  }

  async create(data: ICreateBudgetDTO): Promise<Budget> {
    const budget = this.ormRepository.create(data);
    await this.ormRepository.save(budget);
    return budget;
  }

  async findById(id: string): Promise<Budget | undefined> {
    const budget = await this.ormRepository.findOne({
        where: { id },
        relations: ["items", "customer", "user"],
      });
    return budget || undefined 
  }

  async findByUserId(user_id: string): Promise<Budget[]> {
    return await this.ormRepository.find({
      where: { user_id },
      relations: ["items", "customer", "user"],
    });
  }

  async findAll(): Promise<Budget[]> {
    return await this.ormRepository.find({
      relations: ["items", "customer", "user"],
    });
  }

  async update(budget: Budget): Promise<Budget> {
    return await this.ormRepository.save(budget);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}