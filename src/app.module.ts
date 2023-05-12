import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from '@users/users.module';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env`,
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const dropSchema = configService.get<string>('DB_DROP_SCHEMA') === 'true';
				const synchronize = configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true';
				const logging = configService.get<string>('TYPEORM_LOGGING') === 'true';

				return {
					type: 'mysql',
					host: configService.get<string>('TYPEORM_HOST'),
					port: configService.get<number>('TYPEORM_PORT'),
					username: configService.get<string>('TYPEORM_USERNAME'),
					password: configService.get<string>('TYPEORM_PASSWORD'),
					database: configService.get<string>('TYPEORM_DATABASE'),
					synchronize: synchronize,
					dropSchema: dropSchema,
					logging: logging,
					entities: [join(__dirname, '**', '*.entity.{ts,js}')],
				};
			}
		}),
		MulterModule.register({
			dest: './upload',
		}),
		UserModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
