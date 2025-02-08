import { Repository } from "typeorm";
import { IUserTokensRepository } from "./IUserTokensRepository";
import { UserToken } from "../entities/UserToken";
import { AppDataSource } from "../../../../../shared/infra/database/data-source";

export class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserToken);
  }

  async create(
    user_id: string,
    refresh_token: string,
    expires_date: Date
  ): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
      refresh_token,
      expires_date,
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }

  async findByRefreshToken(
    refresh_token: string
  ): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { refresh_token },
    });
    return userToken || undefined;
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
