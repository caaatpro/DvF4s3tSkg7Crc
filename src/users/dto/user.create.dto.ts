import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({
		example: 'user',
		description: 'Логин пользователя',
		required: true,
	})
	@IsNotEmpty()
	login: string;

	@ApiProperty({
		example: 'Вася',
		description: 'Имя пользователя',
		required: false,
		default: null
	})
	name: string | null;

	@ApiProperty({
		example: 'Пупки',
		description: 'Фамилия пользователя',
		required: false,
		default: null
	})
	surname: string | null;

	@ApiProperty({
		example: 'password',
		description: 'Пароль пользователя',
		required: true,
	})
	@IsNotEmpty()
	password: string;

	@ApiProperty({
		example: 'email@email.ru',
		description: 'Email пользователя',
		required: true,
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;
}