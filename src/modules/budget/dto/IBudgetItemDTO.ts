export interface IBudgetItemDTO {
    product_id: string;
    unit_price: number;
    quantity: number;
    total_price: number;
    discount?: number;
  }