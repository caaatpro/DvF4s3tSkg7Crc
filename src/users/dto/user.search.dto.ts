import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchUserDto {
	@ApiProperty({
		example: 'Вася',
		description: 'Поле для текста',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	text: string;
}