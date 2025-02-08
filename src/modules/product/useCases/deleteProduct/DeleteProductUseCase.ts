import { inject, injectable } from "tsyringe";
import {  ProductRepository,  } from "../../infra/typeorm/repositories/ProductRepository";

@injectable()
export class DeleteProductUseCase {
    constructor(
        @inject(ProductRepository)
        private readonly productRepository: ProductRepository
    ){}

    async execute(id: string): Promise<void> {
        const product = await this.productRepository.findById(id)

        if(!product){
            throw new Error("Produto não encontrado")
        }

        try {
            return await this.productRepository.delete(product.id)
        } catch {
            throw new Error("Erro ao deletar Produto")
        }
    }
}