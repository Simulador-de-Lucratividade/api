import { IAdditionalCostDTO } from "./IAdditionalCostDTO";
import { IBudgetItemDTO } from "./IBudgetItemDTO";
import { IBudgetServiceDTO } from "./IBudgetServiceDTO";

export interface IEditBudgetDTO {
  id: string;
  issue_date?: Date;
  validity_date?: Date;
  total_value?: number;
  status?: string;
  items?: IBudgetItemDTO[];
  services?: IBudgetServiceDTO[];
  other_costs?: IAdditionalCostDTO[];
  title?: string;
  observations?: string;
}
