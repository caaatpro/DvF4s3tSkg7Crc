import { ApiProperty } from '@nestjs/swagger';

export class BaseDao {
	@ApiProperty({
		example: '6af2faf7-6b06-42b0-80f0-dadd3246cb3e',
		description: 'Идентификатор',
	})
	id: string;
}