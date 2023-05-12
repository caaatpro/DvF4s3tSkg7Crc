import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsBoolean,
	IsDefined,
	IsEmail,
	IsNotEmptyObject,
	IsNumber,
	IsOptional,
	Max,
	Min,
	ValidateNested,
} from 'class-validator';

export class UpdateUserDto {
	@ApiProperty({
		example: 'user',
		description: 'Логин пользователя',
		required: false,
	})
	@IsOptional()
	login: string;

	@ApiProperty({
		example: 'Вася',
		description: 'Имя пользователя',
	})
	name: string;

	@ApiProperty({
		example: 'Пупки',
		description: 'Фамилия пользователя',
	})
	surname: string;

	@ApiProperty({
		example: '03.03.2000',
		description: 'Дат рождения',
		required: false,
	})
	birthDate: string;

	@ApiProperty({
		example: 'email@email.ru',
		description: 'Email пользователя',
		required: false,
	})
	@IsOptional()
	@IsEmail()
	email: string;

	@ApiProperty({
		example: 'Адрес',
		description: 'Адрес',
		required: false,
	})
	contactAddress: string | null;

	@ApiProperty({
		example: 'Телефон',
		description: 'Телефон',
		required: false,
	})
	contactPhone: string | null;

	@ApiProperty({
		example: 'Email для связи',
		description: 'Email для связи',
		required: false,
	})
	@IsOptional()
	@IsEmail()
	contactEmail: string | null;

	@ApiProperty({
		example: 'Телеграм',
		description: 'Телеграм',
		required: false,
	})
	contactTelegram: string | null;

	@ApiProperty({
		example: 'VK',
		description: 'VK',
		required: false,
	})
	contactVk: string | null;

	@ApiProperty({
		example: 'Сайт',
		description: 'Сайт',
		required: false,
	})
	contactSite: string | null;

	@ApiProperty({
		example: 'Москва',
		description: 'Город',
		required: false,
	})
	city: string;

	@ApiProperty({
		example: 'Описание',
		description: 'Описание',
		required: false,
	})
	description: string | null;

	@ApiProperty({
		example: 'Короткое описание',
		description: 'Короткое описание',
		required: false,
	})
	descriptionShort: string | null;

	@ApiProperty({
		example: false,
		description: 'Pro',
		required: false,
	})
	@IsBoolean()
	pro: boolean = false;

	@ApiProperty({
		example: 0,
		description: 'Пол',
		required: false,
	})
	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(2)
	sex: number;
}
