import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({
		example: 'user',
		description: 'Логин пользователя',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	login: string;

	@ApiProperty({
		example: 'Вася',
		description: 'Имя пользователя',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({
		example: 'Пупки',
		description: 'Фамилия пользователя',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	surname: string;

	@ApiProperty({
		example: 'Андреевич',
		description: 'Отчество пользователя',
		required: false,
		default: null
	})
	@IsOptional()
	@IsString()
	patronymic: string | null;

	@ApiProperty({
		example: 'password',
		description: 'Пароль пользователя',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	password: string;

	@ApiProperty({
		example: 'email@email.ru',
		description: 'Email пользователя',
		required: true,
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		example: 'Разработчик',
		description: 'Должность',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	position: string;

	@ApiProperty({
		example: 'День рождения',
		description: 'День рождения',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	birthDate: string;
}