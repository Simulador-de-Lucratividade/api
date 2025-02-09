import { inject, injectable } from "tsyringe";
import { ServiceRepository } from "../../infra/typeorm/repositories/ServiceRepository";

@injectable()
export class GetServicesByUserIdUseCase {
  constructor(
    @inject(ServiceRepository)
    private readonly serviceRepository: ServiceRepository
  ) {}

  async execute(userId: string) {
    const service = await this.serviceRepository.findByUserId(userId);

    if (!service) {
      throw new Error("Serviço não encontrado");
    }

    return service;
  }
}
