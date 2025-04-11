export interface IAdditionalCostDTO {
  id?: string;
  cost_type: "percentage" | "fixed";
  description: string;
  amount: number;
}
