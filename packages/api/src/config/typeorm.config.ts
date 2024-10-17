import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource } from "typeorm";
config();

const configService = new ConfigService();

const port = configService.get<string>("POSTGRES_PORT");

if (!port) {
  throw new Error("POSTGRES_PORT is not defined");
}

const AppDataSource = new DataSource({
  type: "postgres",
  host: configService.get<string>("POSTGRES_HOST"),
  port: +port,
  username: configService.get<string>("POSTGRES_USER"),
  password: configService.get<string>("POSTGRES_PASSWORD"),
  database: configService.get<string>("POSTGRES_DB"),
  synchronize: false,
  entities: ["**/*.entity.ts"],
  migrations: ["src/migrations/*-migration.ts"],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
