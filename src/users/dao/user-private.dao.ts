import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@users/entity/user.entity';

export class UserPrivateDao {
	@ApiProperty({
		example: 'user',
		description: 'Логин пользователя',
	})
	login: string;

	@ApiProperty({
		example: 'Вася',
		description: 'Имя пользователя',
	})
	name: string | null;

	@ApiProperty({
		example: 'Пупки',
		description: 'Фамилия пользователя',
	})
	surname: string | null;

	@ApiProperty({
		example: 'Москва',
		description: 'город пользователя',
	})
	city: string | null;

	@ApiProperty({
		example: '03.03.2000',
		description: 'Дата рождения',
	})
	birthDate: string | null;

	@ApiProperty({
		example: '6e0a21ef-8e8e-415f-a4a2-583f59590708-624a.jpg',
		description: 'Автар пользователя',
		required: false,
	})
	avatar: string | null;

	@ApiProperty({
		example: 'Описание',
		description: 'Описание',
		required: false,
	})
	description: string | null;

	@ApiProperty({
		example: 'Корокое описание',
		description: 'Корокое описание',
		required: false,
	})
	descriptionShort: string | null;

	@ApiProperty({
		example: false,
		description: 'Pro',
		required: false,
	})
	pro: boolean;

	@ApiProperty({
		example: 0,
		description: 'Пол',
		required: false,
	})
	sex: number;

	constructor(
		user: UserEntity,
	) {
		this.login = user.login;
		this.avatar = user.avatar;
		this.city = user.city;
		this.name = user.name;
		this.surname = user.surname;
		this.birthDate = user.birthDate;
	}
}