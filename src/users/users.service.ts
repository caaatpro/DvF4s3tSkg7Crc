import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@users/entity/user.entity';
import { removeFile } from '@shared/file-upload.utils';
import { UpdateUserDto } from './dto/user.update.dto';
import { CreateUserDto } from '@users/dto/user.create.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepo: Repository<UserEntity>,
	) {}

	async findById(id: string) {
		return this.userRepo.findOne({
			where: { id }
		});

	}

	async findByEmail(email: string) {
		return this.userRepo.findOne({ where: { email } });
	}

	async create(userDto: CreateUserDto) {
		const { login, password, email, name, surname, patronymic, position } = userDto;

		const userInDb = await this.userRepo.findOne({ where: { email } });
		if (userInDb) {
			throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
		}

		const user: UserEntity = this.userRepo.create({
			login,
			password,
			email,
			name,
			surname,
			patronymic,
			position,
		});

		return this.userRepo.save(user);
	}

	async update(userId: string, updateUserDto: UpdateUserDto) {

		return this.userRepo.update({ id: userId }, updateUserDto);
	}

	async uploadAvatar(userId: string, file: Express.Multer.File) {
		const currentUserInfo = await this.findById(userId);
		const oldAvatar = currentUserInfo?.avatar;
		if (oldAvatar) {
			removeFile('../../upload/avatars/', oldAvatar);
		}

		return this.userRepo.update({ id: userId }, {
			avatar: file.filename,
		});
	}

}