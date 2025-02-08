import { inject, injectable } from "tsyringe";
import { ProductRepository } from "../../infra/typeorm/repositories/ProductRepository";
import { Product } from "../../infra/typeorm/entities/Product";

@injectable()
export class ShowProductUseCase {
  constructor(
    @inject(ProductRepository)
    private readonly productRepository: ProductRepository
  ) {}

  async execute(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    return product;
  }
}
