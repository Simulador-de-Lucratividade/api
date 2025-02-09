import { Service } from "../../services/infra/typeorm/entities/Service";
import { IAdditionalCostDTO } from "./IAdditionalCostDTO";

export interface IProfitabilityCalculationParams {
  items: {
    unit_price: number;
    quantity: number;
    // porcentagem de desconto em cada produto
    discount?: number;
  }[];
  // valor total da venda
  total_value: number;
  services: Service[];
  other_costs?: IAdditionalCostDTO[];
}
