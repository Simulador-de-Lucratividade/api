import { Budget } from "../entities/Budget";
import { ICreateBudgetDTO } from "../../../dto/ICreateBudgetDTO";

export interface IBudgetRepository {
  create(data: ICreateBudgetDTO): Promise<Budget>;
  findById(id: string): Promise<Budget | undefined>;
  findByUserId(user_id: string): Promise<Budget[]>;
  findAll(): Promise<Budget[]>;
  update(budget: Budget): Promise<Budget>;
  delete(id: string): Promise<void>;
}