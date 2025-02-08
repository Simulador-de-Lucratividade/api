export interface IEditProductDTO {
  id: string;
  name: string;
  reference_code?: string;
  description: string;
  acquisition_cost: number;
  sale_price: number;
}