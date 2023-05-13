import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsNotEmpty,
	IsString,
} from 'class-validator';

export class ChangePassUserDto {
	@ApiProperty({
		example: 'email@email.ru',
		description: 'Email пользователя',
		required: true,
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		example: 'password',
		description: 'Пароль пользователя',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	password: string;
}
