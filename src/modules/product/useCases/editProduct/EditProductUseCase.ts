import { inject, injectable } from "tsyringe";
import { ProductRepository } from "../../infra/typeorm/repositories/ProductRepository";
import { Product } from "../../infra/typeorm/entities/Product";
import { IEditProductDTO } from "../../dto/IEditProductDTO";

@injectable()
export class EditProductUseCase {
  constructor(
    @inject(ProductRepository)
    private readonly productRepository: ProductRepository
  ) {}

  async execute({
    id,
    name,
    description,
    sale_price,
    acquisition_cost,
    reference_code,
  }: IEditProductDTO): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    product.name = name;
    product.description = description
    product.reference_code = reference_code;
    product.sale_price = sale_price
    product.acquisition_cost = acquisition_cost;

    try {
      const updatedProduct = await this.productRepository.update(product);
      return updatedProduct;
    } catch {
      throw new Error("Erro ao editar produto");
    }
  }
}
