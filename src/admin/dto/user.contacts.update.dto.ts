import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateContactsUserDto {
	@ApiProperty({
		example: 'Адрес',
		description: 'Адрес',
		required: false,
	})
	@IsOptional()
	address: string | null;

	@ApiProperty({
		example: 'Телефон',
		description: 'Телефон',
		required: false,
	})
	@IsOptional()
	phone: string | null;

	@ApiProperty({
		example: 'Email для связи',
		description: 'Email для связи',
		required: false,
	})
	@IsOptional()
	@IsEmail()
	email: string | null;

	@ApiProperty({
		example: 'Телеграм',
		description: 'Телеграм',
		required: false,
	})
	@IsOptional()
	telegram: string | null;

	@ApiProperty({
		example: 'VK',
		description: 'VK',
		required: false,
	})
	@IsOptional()
	vk: string | null;

	@ApiProperty({
		example: 'Сайт',
		description: 'Сайт',
		required: false,
	})
	@IsOptional()
	site: string | null;
}