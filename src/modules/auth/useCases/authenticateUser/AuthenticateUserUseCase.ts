import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign, SignOptions } from "jsonwebtoken";
import { UserRepository } from "../../../user/infra/typeorm/repositories/UserRepository";
import { UserTokensRepository } from "../../infra/typeorm/repositories/UserTokensRepository";
import { IAuthenticateUserDTO } from "../../dto/IAuthenticateUserDTO";
import { IAuthenticateUserResponseDTO } from "../../dto/IAuthenticateUserResponseDTO";
import dayjs from "dayjs";

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,

    @inject(UserTokensRepository)
    private readonly userTokensRepository: UserTokensRepository
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IAuthenticateUserResponseDTO> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Email ou senha incorretos");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos");
    }

    const token = sign(
      { email: user.email },
      process.env.JWT_SECRET || "secret",
      {
        subject: user.id,
        expiresIn: process.env.JWT_EXPIRES_IN || "15m",
      } as SignOptions
    );

    const refreshToken = sign(
      { email: user.email },
      process.env.JWT_REFRESH_SECRET || "refreshSecret",
      {
        subject: user.id,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
      } as SignOptions
    );

    const refreshTokenExpiresDate = dayjs().add(7, "days").toDate();

    await this.userTokensRepository.create(
      user.id,
      refreshToken,
      refreshTokenExpiresDate
    );

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };
  }
}
