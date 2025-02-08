import { UserToken } from "../entities/UserToken";

export interface IUserTokensRepository {
  create(
    user_id: string,
    refresh_token: string,
    expires_date: Date
  ): Promise<UserToken>;
  findByRefreshToken(refresh_token: string): Promise<UserToken | undefined>;
  deleteById(id: string): Promise<void>;
}
