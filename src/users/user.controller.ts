import {
	Controller,
	Get,
	UseGuards,
	UploadedFile,
	Post,
	Put,
	ParseFilePipe,
	FileTypeValidator,
	MaxFileSizeValidator,
	UseInterceptors,
	Param,
	Body,
	NotFoundException} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '@users/entity/user.entity';
import { User } from '@users/user.decorator';
import { JwtAuthGuard } from '@auth/guards/jvt.guard';
import { UsersService } from './users.service';
import { avatarFileName } from '@shared/file-upload.utils';
import { SuccessUpdateDao } from '@shared/dao/success.update.dao';
import { UpdateUserDto } from './dto/user.update.dto';
import { UserDao } from './dao/user.dao';
import { existsSync } from 'fs';
import { join } from 'path';
import { UserShortDao } from './dao/user-short.dao';
import { SearchUserDto } from './dto/user.search.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(
		private readonly usersService: UsersService,
	) {}

	@ApiOperation({
		summary: 'Поиск по сотрудникам',
		description: 'Поиск по сотрудникам.',
	})
	@ApiResponse({
		status: 200,
		description: 'Всё хорошо',
		type: UserShortDao,
		isArray: true,
	})
	@ApiResponse({
		status: 401,
		description: 'Пустой или неверный токен.',
	})
	@ApiBearerAuth()
	@Post('searchShort')
	@UseGuards(JwtAuthGuard)
	async searchShort(
		@Body() searchUserDto: SearchUserDto
	) {
		const list = await this.usersService.find(searchUserDto);
		return list.map((item) => new UserShortDao(item));
	}

	@ApiOperation({
		summary: 'Список сотрудников',
		description: 'Список сотрудников.',
	})
	@ApiResponse({
		status: 200,
		description: 'Всё хорошо',
		type: UserDao,
		isArray: true,
	})
	@ApiResponse({
		status: 401,
		description: 'Пустой или неверный токен.',
	})
	@ApiBearerAuth()
	@Post('search')
	@UseGuards(JwtAuthGuard)
	async search(
		@Body() searchUserDto: SearchUserDto) {
		const list = await this.usersService.find(searchUserDto);

		return list.map((item) => new UserDao(item));
	}

	@ApiOperation({
		summary: 'Информация о текущем сотруднике',
		description: 'Информация о текущем авторизованном сотруднике.',
	})
	@ApiResponse({
		status: 200,
		description: 'Всё хорошо',
		type: UserDao,
	})
	@ApiResponse({
		status: 401,
		description: 'Пустой или неверный токен.',
	})
	@ApiBearerAuth()
	@Get()
	@UseGuards(JwtAuthGuard)
	async info(@User() user: UserEntity) {
		const userInfo = await this.usersService.findById(user.id);
		if (userInfo) {
			return new UserDao(userInfo);
		}
	}

	@ApiOperation({
		summary: 'Информация о сотруднике по id',
		description: 'Информация о сотруднике по id.',
	})
	@ApiResponse({
		status: 200,
		description: 'Всё хорошо',
		type: UserDao,
	})
	@ApiResponse({
		status: 401,
		description: 'Пустой или неверный токен.',
	})
	@ApiBearerAuth()
	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async getUser(@Param('id') id: string) {
		const user = await this.usersService.findById(id);
		if (!user) {
			throw new NotFoundException('Сотрудник не найден');
		}

		return user;
	}
}