import { inject, injectable } from "tsyringe";
import { Service } from "../../infra/typeorm/entities/Service";
import { ServiceRepository } from "../../infra/typeorm/repositories/ServiceRepository";

interface IRequest {
  id: string;
  name: string;
  description: string;
  cost: number;
  user_id: string;
}

@injectable()
export class UpdateServiceUseCase {
  constructor(
    @inject(ServiceRepository)
    private readonly serviceRepository: ServiceRepository
  ) {}

  async execute({
    id,
    name,
    description,
    cost,
    user_id,
  }: IRequest): Promise<Service> {
    const service = await this.serviceRepository.findById(id);

    if (!service) {
      throw new Error("Serviço não encontrado");
    }

    if (service.user_id !== user_id) {
      throw new Error("Você não tem permissão para editar este serviço");
    }

    service.name = name;
    service.description = description;
    service.cost = cost;

    try {
      const updatedService = await this.serviceRepository.update(service);
      return updatedService;
    } catch {
      throw new Error("Erro ao atualizar serviço");
    }
  }
}
