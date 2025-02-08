import { inject, injectable } from "tsyringe";
import { ProductRepository } from "../../infra/typeorm/repositories/ProductRepository";
import { ICreateProductDTO } from "../../dto/ICreateProductDTO";
import { Product } from "../../infra/typeorm/entities/Product";

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject(ProductRepository)
    private readonly productRepository: ProductRepository
  ) {}

  async execute(data: ICreateProductDTO): Promise<Product> {
    const product = await this.productRepository.create(data);

    if (!product) {
      throw new Error("Falha ao criar produto.");
    }

    return product;
  }
}
