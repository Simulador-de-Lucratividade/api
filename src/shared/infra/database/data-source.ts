import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
  synchronize: true,
  logging: true,
  entities: [
    `${__dirname}/../../../modules/**/infra/typeorm/entities/*.{ts,js}`,
  ],
  migrations: [`${__dirname}/../typeorm/migrations/*.{ts,js}`],
});
