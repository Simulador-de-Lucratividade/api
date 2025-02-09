import { ProfitabilityCalculator } from "./ProfitabilityCalculator";
import { IProfitabilityCalculationParams } from "../../dto/IProfitabilityCalculation";
import { injectable } from "tsyringe";

@injectable()
export class CalculateProfitabilityUseCase {
  async execute({
    items,
    total_value,
    other_costs,
    services,
  }: IProfitabilityCalculationParams): Promise<number> {
    const calculator = new ProfitabilityCalculator();
    return calculator.calculate({ items, total_value, other_costs, services });
  }
}
