import { injectable, inject } from "tsyringe";
import { BudgetRepository } from "../../infra/typeorm/repositories/BudgetRepository";
import { BudgetService } from "../../infra/typeorm/entities/BudgetService";
import { BudgetItem } from "../../infra/typeorm/entities/BudgetItem";
import type { IEditBudgetDTO } from "../../dto/IEditBudgetDTO";
import type { Budget } from "../../infra/typeorm/entities/Budget";
import { BudgetServiceRepository } from "../../infra/typeorm/repositories/BudgetServiceRepository";
import { BudgetItemRepository } from "../../infra/typeorm/repositories/BudgetItemRepository";
import { BudgetOtherCostRepository } from "../../infra/typeorm/repositories/BudgetOtherCostRepository";
import { BudgetOtherCost } from "../../infra/typeorm/entities/BudgetOtherCosts";

@injectable()
export class EditBudgetUseCase {
  constructor(
    @inject(BudgetRepository)
    private budgetRepository: BudgetRepository,
    @inject(BudgetServiceRepository)
    private budgetServiceRepository: BudgetServiceRepository,
    @inject(BudgetItemRepository)
    private budgetItemRepository: BudgetItemRepository,
    @inject(BudgetOtherCostRepository)
    private budgetOtherCostRepository: BudgetOtherCostRepository
  ) {}

  async execute(data: IEditBudgetDTO): Promise<Budget> {
    const budget = await this.budgetRepository.findById(data.id);

    if (!budget) {
      throw new Error("Budget not found");
    }

    budget.issue_date = data.issue_date || budget.issue_date;
    budget.validity_date = data.validity_date || budget.validity_date;
    budget.total_value = data.total_value || budget.total_value;
    budget.status = data.status || budget.status;
    budget.title = data.title || budget.title;
    budget.observations = data.observations || budget.observations;

    if (data.items !== undefined) {
      if (data.items.length === 0) {
        for (const item of budget.items) {
          await this.budgetItemRepository.delete(item.id);
        }
        budget.items = [];
      } else {
        const existingItemIds = budget.items.map((item) => item.id);
        const newItemIds = data.items
          .filter((item) => item.id)
          .map((item) => item.id);

        const itemsToRemove = budget.items.filter(
          (item) => !newItemIds.includes(item.id)
        );

        if (itemsToRemove.length > 0) {
          for (const item of itemsToRemove) {
            await this.budgetItemRepository.delete(item.id);
          }
        }

        const updatedItems = [];

        for (const itemData of data.items) {
          if (itemData.id && existingItemIds.includes(itemData.id)) {
            const existingItem = budget.items.find((i) => i.id === itemData.id);

            if (existingItem) {
              existingItem.product_id =
                itemData.product_id || existingItem.product_id;
              existingItem.unit_price =
                itemData.unit_price || existingItem.unit_price;
              existingItem.quantity =
                itemData.quantity || existingItem.quantity;
              existingItem.total_price =
                itemData.total_price || existingItem.total_price;
              existingItem.discount =
                itemData.discount || existingItem.discount;

              const savedItem = await this.budgetItemRepository.save(
                existingItem
              );
              updatedItems.push(savedItem);
            }
          } else {
            const newItem = new BudgetItem();
            newItem.budget_id = budget.id;
            newItem.product_id = itemData.product_id;
            newItem.unit_price = itemData.unit_price;
            newItem.quantity = itemData.quantity;
            newItem.total_price = itemData.total_price;
            newItem.discount = itemData.discount;

            const savedItem = await this.budgetItemRepository.save(newItem);
            updatedItems.push(savedItem);
          }
        }

        budget.items = updatedItems;
      }
    }

    if (data.services !== undefined) {
      if (data.services.length === 0) {
        for (const service of budget.services) {
          await this.budgetServiceRepository.delete(service.id);
        }
        budget.services = [];
      } else {
        const existingServiceIds = budget.services.map((service) => service.id);
        const newServiceIds = data.services
          .filter((service) => service.id)
          .map((service) => service.id);

        const servicesToRemove = budget.services.filter(
          (service) => !newServiceIds.includes(service.id)
        );

        if (servicesToRemove.length > 0) {
          for (const service of servicesToRemove) {
            await this.budgetServiceRepository.delete(service.id);
          }
        }

        const updatedServices = [];

        for (const serviceData of data.services) {
          if (serviceData.id && existingServiceIds.includes(serviceData.id)) {
            const existingService = budget.services.find(
              (s) => s.id === serviceData.id
            );

            if (existingService) {
              existingService.service_id =
                serviceData.service_id || existingService.service_id;
              existingService.cost = serviceData.cost || existingService.cost;
              existingService.quantity =
                serviceData.quantity || existingService.quantity;
              existingService.total_cost =
                serviceData.total_cost || existingService.total_cost;

              const savedService = await this.budgetServiceRepository.save(
                existingService
              );
              updatedServices.push(savedService);
            }
          } else {
            const newService = new BudgetService();
            newService.budget_id = budget.id;
            newService.service_id = serviceData.service_id;
            newService.cost = serviceData.cost;
            newService.quantity = serviceData.quantity || 1;
            newService.total_cost = serviceData.total_cost;

            const savedService = await this.budgetServiceRepository.save(
              newService
            );
            updatedServices.push(savedService);
          }
        }

        budget.services = updatedServices;
      }
    }

    if (data.other_costs !== undefined) {
      if (data.other_costs.length === 0) {
        for (const cost of budget.other_costs) {
          await this.budgetOtherCostRepository.delete(cost.id);
        }
        budget.other_costs = [];
      } else {
        const existingOtherCostIds = budget.other_costs.map((cost) => cost.id);
        const newOtherCostIds = data.other_costs
          .filter((cost) => cost.id)
          .map((cost) => cost.id);

        const otherCostsToRemove = budget.other_costs.filter(
          (cost) => !newOtherCostIds.includes(cost.id)
        );

        if (otherCostsToRemove.length > 0) {
          for (const cost of otherCostsToRemove) {
            await this.budgetOtherCostRepository.delete(cost.id);
          }
        }

        const updatedOtherCosts = [];

        for (const costData of data.other_costs) {
          if (costData.id && existingOtherCostIds.includes(costData.id)) {
            const existingOtherCost = budget.other_costs.find(
              (c) => c.id === costData.id
            );

            if (existingOtherCost) {
              existingOtherCost.description =
                costData.description || existingOtherCost.description;
              existingOtherCost.amount =
                costData.amount || existingOtherCost.amount;
              existingOtherCost.cost_type =
                costData.cost_type || existingOtherCost.cost_type;

              const savedOtherCost = await this.budgetOtherCostRepository.save(
                existingOtherCost
              );
              updatedOtherCosts.push(savedOtherCost);
            }
          } else {
            const newOtherCost = new BudgetOtherCost();
            newOtherCost.budget_id = budget.id;
            newOtherCost.description = costData.description;
            newOtherCost.amount = costData.amount;
            newOtherCost.cost_type = costData.cost_type || "fixed";

            const savedOtherCost = await this.budgetOtherCostRepository.save(
              newOtherCost
            );
            updatedOtherCosts.push(savedOtherCost);
          }
        }

        budget.other_costs = updatedOtherCosts;
      }
    }

    return this.budgetRepository.update(budget);
  }
}
