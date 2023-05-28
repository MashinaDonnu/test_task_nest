import dotenv = require('dotenv');
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();
export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  synchronize: false,
  migrations: [getMigrationDirectory()],
  migrationsTableName: 'migrations_typeorm',
};

function getMigrationDirectory() {
  return `${stringBool(process.env.IS_TS_NODE) ? 'src' : 'dist'}/database/migrations/**/*{.ts,.js}`;
}

function stringBool(str) {
  return str === 'true';
}

export default new DataSource(ormConfig);
