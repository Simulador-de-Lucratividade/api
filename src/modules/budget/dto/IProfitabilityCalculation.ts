import { IAdditionalCostDTO } from "./IAdditionalCostDTO";
import { IBudgetServiceDTO } from "./IBudgetServiceDTO";

export interface IProfitabilityCalculationParams {
  items: {
    unit_price: number;
    quantity: number;
    // porcentagem de desconto em cada produto
    discount?: number;
  }[];
  // valor total da venda
  total_value: number;
  services: IBudgetServiceDTO[];
  other_costs?: IAdditionalCostDTO[];
}
