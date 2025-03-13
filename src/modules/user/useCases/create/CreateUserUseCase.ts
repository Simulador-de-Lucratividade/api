import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../infra/typeorm/repositories/UserRepository";
import { User } from "../../infra/typeorm/entities/User";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import bcrypt from "bcrypt";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("Usuário existente");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    if (!user) {
      throw new Error("Falha ao criar usuário");
    }

    return user;
  }
}
