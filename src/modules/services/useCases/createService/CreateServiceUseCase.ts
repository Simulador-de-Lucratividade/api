import { inject, injectable } from "tsyringe";
import { ICreateServiceDTO } from "../../dto/ICreateServiceDTO";
import { Service } from "../../infra/typeorm/entities/Service";
import { ServiceRepository } from "../../infra/typeorm/repositories/ServiceRepository";

@injectable()
export class CreateServiceUseCase {
  constructor(
    @inject(ServiceRepository)
    private readonly serviceRepository: ServiceRepository
  ) {}

  async execute(data: ICreateServiceDTO): Promise<Service> {
    const service = await this.serviceRepository.create(data);

    if (!service) {
      throw new Error("Falha ao criar serviço.");
    }

    return service;
  }
}
