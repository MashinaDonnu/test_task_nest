import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { ConfigService } from '@nestjs/config';

export default (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get<'aurora-postgres'>('DB_HOST'),
  username: config.get<string>('DB_USERNAME'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get<string>('DB_NAME'),
  port: +config.get<string>('DB_PORT'),
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  synchronize: true,

  migrationsTableName: 'migrations_typeorm',
  migrations: ['src/database/migrations'],
  logging: true,
});
