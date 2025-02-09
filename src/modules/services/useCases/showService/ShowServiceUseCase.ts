import { inject, injectable } from "tsyringe";
import { ServiceRepository } from "../../infra/typeorm/repositories/ServiceRepository";
import { Service } from "../../infra/typeorm/entities/Service";

@injectable()
export class ShowServiceUseCase {
  constructor(
    @inject(ServiceRepository)
    private readonly serviceRepository: ServiceRepository
  ) {}

  async execute(productId: string): Promise<Service> {
    const service = await this.serviceRepository.findById(productId);

    if (!service) {
      throw new Error("Serviço não encontrado");
    }

    return service;
  }
}
