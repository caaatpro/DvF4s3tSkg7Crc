import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserEntity } from '@users/entity/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async login({ id, email, login }: UserEntity) {
		const payload = { id, email, login };
		const accessToken = this.jwtService.sign(payload);

		return {
			accessToken,
		};
	}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findByEmail(email);
		if (!user) {
			throw new HttpException('не нашел пользователя', HttpStatus.UNAUTHORIZED);
		}

		const isCorrectPassword = await compare(password, user.password);
		if (!isCorrectPassword) {
			throw new HttpException('не верный пароль', HttpStatus.UNAUTHORIZED);
		}

		return user;
	}
}