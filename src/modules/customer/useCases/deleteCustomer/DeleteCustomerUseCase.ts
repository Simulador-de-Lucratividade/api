import { inject, injectable } from "tsyringe";
import { CustomerRepository } from "../../infra/typeorm/repositories/CustomerRepository";

@injectable()
export class DeleteCustomerUseCase {
    constructor(
        @inject(CustomerRepository)
        private readonly customerRepository: CustomerRepository
    ){}

    async execute(id: string): Promise<void> {
        const customer = await this.customerRepository.findById(id)

        if(!customer){
            throw new Error("Cliente não encontrado")
        }

        try {
            return await this.customerRepository.delete(customer.id)
        } catch {
            throw new Error("Erro ao deletar cliente")
        }
    }
}