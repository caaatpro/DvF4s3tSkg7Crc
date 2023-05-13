import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@users/entity/user.entity';
import { removeFile } from '@shared/file-upload.utils';
import { UpdateUserDto } from './dto/user.update.dto';
import { CreateUserDto } from '@users/dto/user.create.dto';
import { SearchUserDto } from './dto/user.search.dto';
import { ChangePassUserDto } from './dto/user.change.pass.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepo: Repository<UserEntity>,
	) {}

	async find(searchUserDto: SearchUserDto) {
		return this.userRepo
			.createQueryBuilder()
			.select()
			.where('searchFull LIKE :searchFull', {searchFull: `%${searchUserDto.text}%`})
			.limit(10)
			.getMany();
	}

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

	async changePass(changePassUserDto: ChangePassUserDto) {
		const { email, password } = changePassUserDto;

		const user = await this.userRepo.findOne({
			where: {
				email,
			}
		});

		if (!user) {
			throw new HttpException('Сотрудник не найден', HttpStatus.NOT_FOUND);
		}

		const toSaveUser = this.userRepo.create({
			...user,
			...changePassUserDto,
		});

		return this.userRepo.save(toSaveUser);
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