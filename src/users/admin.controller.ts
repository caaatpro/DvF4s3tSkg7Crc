import {
	Controller,
	UseGuards,
	UploadedFile,
	Post,
	Put,
	ParseFilePipe,
	FileTypeValidator,
	MaxFileSizeValidator,
	UseInterceptors,
	Get,
	Body} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '@users/entity/user.entity';
import { User } from '@users/user.decorator';
import { JwtAuthGuard } from '@auth/guards/jvt.guard';
import { avatarFileName } from '@shared/file-upload.utils';
import { SuccessUpdateDao } from '@shared/dao/success.update.dao';
import { CreateUserDto } from './dto/user.create.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/user.update.dto';
import { UserDao } from './dao/user.dao';
import { ChangePassUserDto } from './dto/user.change.pass.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
	constructor(
		private readonly usersService: UsersService,
	) {}

	@ApiOperation({
		summary: 'Создание пользователя',
		description: 'Создание пользователя.',
	})
	@ApiResponse({
		status: 200,
		description: 'Всё хорошо',
		type: SuccessUpdateDao,
	})
	@ApiResponse({
		status: 401,
		description: 'Пустой или неверный токен.',
	})
	@ApiBearerAuth()
	@Post('changePass')
	@UseGuards(JwtAuthGuard)
	async changePass(
		@Body() changePassUserDto: ChangePassUserDto
	) {
		await this.usersService.changePass(changePassUserDto);
		return new SuccessUpdateDao();
	}

	@ApiOperation({
		summary: 'Создание пользователя',
		description: 'Создание пользователя.',
	})
	@ApiResponse({
		status: 200,
		description: 'Всё хорошо',
		type: SuccessUpdateDao,
	})
	@ApiResponse({
		status: 401,
		description: 'Пустой или неверный токен.',
	})
	@ApiBearerAuth()
	@Post('user')
	@UseGuards(JwtAuthGuard)
	async createUser(
		@Body() createUserDto: CreateUserDto
	) {
		await this.usersService.create(createUserDto);
		return new SuccessUpdateDao();
	}

	@ApiOperation({
		summary: 'Создание пользователя',
		description: 'Создание пользователя.',
	})
	@ApiResponse({
		status: 200,
		description: 'Всё хорошо',
		type: SuccessUpdateDao,
	})
	@ApiResponse({
		status: 401,
		description: 'Пустой или неверный токен.',
	})
	@ApiBearerAuth()
	@Get('users')
	@UseGuards(JwtAuthGuard)
	async getUsers() {
		return [];
	}

	@ApiOperation({
		summary: 'Обновление',
		description: 'Обновление информации о пользователе.',
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
	@Put()
	@UseGuards(JwtAuthGuard)
	async update(
		@User() user: UserEntity,
		@Body() updateUserDto: UpdateUserDto
	) {
		await this.usersService.update(user.id, updateUserDto);
		return new SuccessUpdateDao();
	}

	@ApiOperation({
		summary: 'Загрузка аватара',
		description: 'Загрузка аватара пользователя.',
	})
	@ApiResponse({
		status: 201,
		description: 'Всё хорошо',
		type: UserDao,
	})
	@ApiResponse({
		status: 401,
		description: 'Пустой или неверный токен.',
	})
	@ApiBearerAuth()
	@Post('avatar')
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './upload/avatars',
				filename: avatarFileName,
			}),
		})
	)
	async uploadAvatar(
		@User() user: UserEntity,
		@UploadedFile(
			new ParseFilePipe({
			  validators: [
				new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
				new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
			  ],
			}),
		  )
		  file: Express.Multer.File,
	) {
		await this.usersService.uploadAvatar(user.id, file);
		return new SuccessUpdateDao();
	}
}