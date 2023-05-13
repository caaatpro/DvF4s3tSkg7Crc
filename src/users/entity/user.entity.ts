import { ApiExcludeController } from '@nestjs/swagger';
import { Base } from '@shared/base-entity';
import { genSaltSync, hashSync } from 'bcrypt';
import {
	Entity,
	Column,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';

@Entity('users')
@ApiExcludeController()
export class UserEntity extends Base {
	/**
	 * Логин сотрудника
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: false,
		unique: true,
	})
	login: string;

	/**
	 * Имя сотрудника
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: true,
	})
	name: string | null;

	/**
	 * Фамилия сотрудника
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: false,
	})
	surname: string | null;

	/**
	 * Отчество сотрудника
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: true,
	})
	patronymic: string | null;

	/**
	 * Дата рождения сотрудника
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: false,
	})
	birthDate: string;

	/**
	 * Пароль сотрудника
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: false
	})
	password: string;

	/**
	 * Email сотрудника
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: false,
		unique: true
	})
	email: string;

	/**
	 * Аватар сотрудника
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: true,
	})
	avatar: string | null;

	/**
	 * Телефон
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: true,
	})
	contactPhone: string | null;

	/**
	 * Телеграм
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: true,
	})
	contactTelegram: string | null;

	/**
	 * Город
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: false,
	})
	city: string;

	/**
	 * Должность
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: false,
	})
	position: string;

	/**
	 * Статус текст
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: true,
	})
	statusText: string;

	/**
	 * Статус иконка
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: true,
	})
	statusIcon: string;

	/**
	 * Админ
	 *
	 * @type {boolean}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'boolean',
		nullable: false,
		default: false,
	})
	isAdmin: boolean;

	/**
	 * Для поиска
	 *
	 * @type {string}
	 * @memberof UserEntity
	 */
	@Column({
		type: 'varchar',
		nullable: true,
		default: '',
		unique: true,
	})
	searchFull: string;

	@BeforeUpdate()
	@BeforeInsert()
	async hashPassword() {
		const salt = genSaltSync(10);
		this.password = hashSync(this.password, salt);
	}
}