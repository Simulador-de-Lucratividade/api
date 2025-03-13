import { inject, injectable } from "tsyringe";
import { JwtPayload, sign, SignOptions, verify } from "jsonwebtoken";
import { UserTokensRepository } from "../../infra/typeorm/repositories/UserTokensRepository";
import dayjs from "dayjs";

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject(UserTokensRepository)
    private readonly userTokensRepository: UserTokensRepository
  ) {}

  async execute(
    refresh_token: string
  ): Promise<{ token: string; refreshToken: string }> {
    const decoded = verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET || "refreshSecret"
    );
    const user_id = (decoded as JwtPayload).sub as string;

    const userToken = await this.userTokensRepository.findByRefreshToken(
      refresh_token
    );
    if (!userToken) {
      throw new Error("Refresh token inválido");
    }

    const token = sign(
      { email: (decoded as JwtPayload).email },
      process.env.JWT_SECRET || "secret",
      {
        subject: user_id,
        expiresIn: process.env.JWT_EXPIRES_IN || "15m",
      } as SignOptions
    );

    const newRefreshToken = sign(
      { email: (decoded as JwtPayload).email },
      process.env.JWT_REFRESH_SECRET || "refreshSecret",
      {
        subject: user_id,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
      } as SignOptions
    );

    const refreshTokenExpiresDate = dayjs().add(7, "days").toDate();

    await this.userTokensRepository.create(
      user_id,
      newRefreshToken,
      refreshTokenExpiresDate
    );
    await this.userTokensRepository.deleteById(userToken.id);

    return {
      token,
      refreshToken: newRefreshToken,
    };
  }
}
