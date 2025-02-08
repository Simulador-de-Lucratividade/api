import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../infra/typeorm/repositories/UserRepository";
import { IUserDTO } from "../../dto/IUserDTO";

@injectable()
export class ShowUserUseCase {
  constructor(
    @inject(UserRepository)
    private userRepository: UserRepository
  ) {}

  public async execute(user_id: string): Promise<IUserDTO> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const userDTO: IUserDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      document: user.document,
      profile: user.profile,
      status: user.status,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return userDTO;
  }
}
