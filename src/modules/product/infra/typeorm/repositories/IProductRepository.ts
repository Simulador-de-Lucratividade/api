import { ICreateProductDTO } from "../../../dto/ICreateProductDTO";
import { Product } from "../entities/Product";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByUserId(user_id: string): Promise<Product[] | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  update(data: Product): Promise<Product>
  delete(id: string): Promise<void>
}
