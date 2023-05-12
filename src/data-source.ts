import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

const dropSchema = configService.get<string>('DB_DROP_SCHEMA') === 'true';
const synchronize = configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true';
const logging = configService.get<string>('TYPEORM_LOGGING') === 'true';
const migrationsRun = configService.get<string>('TYPEORM_MIGRATIONS_RUN') === 'true';

export const dataSourceOptions: DataSourceOptions = {
	type: 'mysql',
	host: configService.get<string>('TYPEORM_HOST'),
	port: configService.get<number>('TYPEORM_PORT'),
	username: configService.get<string>('TYPEORM_USERNAME'),
	password: configService.get<string>('TYPEORM_PASSWORD'),
	database: configService.get<string>('TYPEORM_DATABASE'),
	synchronize,
	dropSchema,
	logging,
	entities: ['dist/**/*.entity.js'],
	migrations: ['dist/migrations/*.js'],
	migrationsRun,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;