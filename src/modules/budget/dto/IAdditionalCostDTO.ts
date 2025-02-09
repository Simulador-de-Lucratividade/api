export interface IAdditionalCostDTO {
    cost_type: "percentage" | "fixed";
    description: string;
    amount: number
}