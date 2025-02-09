import { IBudgetItemDTO } from "./IBudgetItemDTO";

export interface IEditBudgetDTO {
  id: string;
  issue_date: Date;
  validity_date: Date;
  total_value: number;
  status?: string;
  items: IBudgetItemDTO[];
}
