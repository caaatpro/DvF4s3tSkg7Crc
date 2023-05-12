import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
	@ApiProperty({
		example: 'user@email.com',
		description: 'Email пользователя',
		required: true,
	})
	@IsNotEmpty()
	readonly email: string;

	@ApiProperty({
		example: 'password',
		description: 'Пароль пользователя',
		required: true,
	})
	@IsNotEmpty()
	readonly password: string;
}