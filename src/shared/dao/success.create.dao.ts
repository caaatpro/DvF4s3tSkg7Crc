import { ApiProperty } from '@nestjs/swagger';

export class SuccessCreateDao {
	@ApiProperty({
		example: 201,
		description: 'Статус код',
		type: Number
	})
	statusCode: number = 201;

	@ApiProperty({
		example: 'Success',
		description: 'Статус',
		type: String
	})
	status: string = 'Success';
}