import { ApiProperty } from '@nestjs/swagger';

export class SuccessUpdateDao {
	@ApiProperty({
		example: 200,
		description: 'Статус код',
		type: Number
	})
	statusCode: number = 200;

	@ApiProperty({
		example: 'Success',
		description: 'Статус',
		type: String
	})
	status: string = 'Success';
}