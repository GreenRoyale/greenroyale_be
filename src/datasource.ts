import config from "config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const isDevelopment = config.get<string>("NODE_ENV") === "development";

const AppDataSource = new DataSource({
  type: "postgres",
  host: config.get<string>("DB_HOST"),
  port: config.get<number>("DB_PORT") ?? 5432,
  username: config.get<string>("DB_USER"),
  password: config.get<string>("DB_PASSWORD"),
  database: config.get<string>("DB_NAME"),
  synchronize: isDevelopment,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  migrationsTableName: "migrations",
});

export async function initializeDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}

export default AppDataSource;
