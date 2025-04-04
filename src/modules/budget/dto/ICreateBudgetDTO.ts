import { IBudgetItemDTO } from "./IBudgetItemDTO";
import { IBudgetServiceDTO } from "./IBudgetServiceDTO";

export interface ICreateBudgetDTO {
  customer_id: string;
  user_id: string;
  issue_date: Date;
  validity_date: Date;
  total_value: number;
  status?: string;
  items: IBudgetItemDTO[];
  services: IBudgetServiceDTO[];
  title: string;
  observations?: string;
}
