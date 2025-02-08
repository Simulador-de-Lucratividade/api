export interface ICreateProductDTO {
  name: string;
  reference_code?: string;
  description: string;
  acquisition_cost: number;
  sale_price: number;
  user_id: string
}