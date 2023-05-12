import {
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
	/**
	 * Идентификатор
	 *
	 * @type {string}
	 * @memberof Base
	 */
	@PrimaryGeneratedColumn('uuid')
	id: string;

	/**
	 * Дата добавления
	 *
	 * @type {Date}
	 * @memberof Base
	 */
	@CreateDateColumn({
		update: false,
	})
	createAt: Date;

	/**
	 * Дата обновления
	 *
	 * @type {Date}
	 * @memberof Base
	 */
	@UpdateDateColumn({
		update: false,
	})
	updateAt: Date;
}
