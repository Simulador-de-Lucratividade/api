import { injectable } from "tsyringe";
import { IProductRepository } from "./IProductRepository";
import { Repository } from "typeorm";
import { Product } from "../entities/Product";
import { AppDataSource } from "../../../../../shared/infra/database/data-source";
import { ICreateProductDTO } from "../../../dto/ICreateProductDTO";

@injectable()
export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  async findAll(): Promise<Product[]> {
    return this.ormRepository.find();
  }

  async findByUserId(user_id: string): Promise<Product[] | undefined> {
    const product = await this.ormRepository.find({ where: { user_id } });
    return product || undefined;
  }

  async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ where: { id } });
    return product || undefined;
  }

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);
    await this.ormRepository.save(product)
    return product;
  }

  async update(data: Product): Promise<Product> {
      return this.ormRepository.save(data)
  }

  async delete(id: string): Promise<void> {
      await this.ormRepository.delete(id)
  }
}
