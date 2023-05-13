import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@users/entity/user.entity';

export class UserShortDao {
	@ApiProperty({
		example: 'Вася',
		description: 'Имя сотрудника',
	})
	name: string | null;

	@ApiProperty({
		example: 'Пупки',
		description: 'Фамилия сотрудника',
	})
	surname: string | null;

	@ApiProperty({
		example: 'Андреевич',
		description: 'Отчество сотрудника',
	})
	patronymic: string | null;

	constructor(
		user: UserEntity,
	) {
		this.name = user.name;
		this.surname = user.surname;
		this.patronymic = user.patronymic;
	}
}