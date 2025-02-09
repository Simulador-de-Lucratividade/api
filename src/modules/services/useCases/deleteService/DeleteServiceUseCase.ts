import { inject, injectable } from "tsyringe";
import { ServiceRepository } from "../../infra/typeorm/repositories/ServiceRepository";

@injectable()
export class DeleteServiceUseCase {
  constructor(
    @inject(ServiceRepository)
    private readonly serviceRepository: ServiceRepository
  ) {}

  async execute(id: string): Promise<void> {
    const service = await this.serviceRepository.findById(id);

    if (!service) {
      throw new Error("Serviço não encontrado");
    }

    try {
      return await this.serviceRepository.delete(service.id);
    } catch {
      throw new Error("Erro ao deletar serviço");
    }
  }
}
