import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['log', 'error', 'warn'],
	});
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: { enableImplicitConversion: true },
			whitelist: true,
		}),
	);
	app.setGlobalPrefix('api');
	app.enableCors({
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
	});

	const config = app.get(ConfigService);

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Api company')
		.setDescription('Api company')
		.setVersion('1.0')
		.addBearerAuth({
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
			name: 'JWT',
			description: 'Enter JWT token',
			in: 'header',
		})
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('swagger', app, document);

	// app.useGlobalFilters(new HttpExceptionFilter());

	const port = config.get<number>('API_PORT');

	await app.listen(port || 3000, () => {
		console.log(`App started on port ${port}`);
	});
}
bootstrap();
