import { IProfitabilityCalculationParams } from "../../dto/IProfitabilityCalculation";

export class ProfitabilityCalculator {
  calculate({
    items,
    total_value,
    other_costs,
  }: IProfitabilityCalculationParams): number {
    const itemsCost = items.reduce((acc, item) => {
      const discountFactor = item.discount ? 1 - item.discount / 100 : 1;
      return acc + item.unit_price * discountFactor * item.quantity;
    }, 0);

    const fixedCosts =
      other_costs
        ?.filter((cost) => cost.cost_type === "fixed")
        .reduce((acc, cost) => acc + Number(cost.amount), 0) || 0;

    const percentageCosts =
      other_costs
        ?.filter((cost) => cost.cost_type === "percentage")
        .reduce(
          (acc, cost) => acc + (itemsCost * Number(cost.amount)) / 100,
          0
        ) || 0;

    const totalCost = itemsCost + fixedCosts + percentageCosts;

    if (totalCost === 0) {
      throw new Error("Custo total não pode ser zero");
    }

    // Calculo da lucratividade
    const profitability = Number(
      (((total_value - totalCost) / totalCost) * 100).toFixed(2)
    );

    return profitability;
  }
}
