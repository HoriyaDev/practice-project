import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const pgConfig: PostgresConnectionOptions = {
  url: 'postgresql://neondb_owner:npg_m3BDwTJjkfp9@ep-floral-unit-a84sq2to-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  type: 'postgres',
  port: 5432,
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  synchronize: true,
};
