import { inject, injectable } from "tsyringe";
import { ProductRepository } from "../../infra/typeorm/repositories/ProductRepository";

@injectable()
export class GetProductsByUserIdUseCase {
  constructor(
    @inject(ProductRepository)
    private readonly productRepository: ProductRepository
  ) {}

  async execute(userId: string) {
    const product = await this.productRepository.findByUserId(userId);

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    return product;
  }
}
