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
	Body} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '@users/entity/user.entity';
import { User } from '@users/user.decorator';
import { JwtAuthGuard } from '@auth/guards/jvt.guard';
import { UserDao } from './dao/user.dao';
import { UsersService } from './users.service';
import { avatarFileName } from '@shared/file-upload.utils';
import { SuccessUpdateDao } from '@shared/dao/success.update.dao';
import { UpdateUserDto } from './dto/user.update.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(
		private readonly usersService: UsersService,
	) {}

	@ApiOperation({
		summary: 'Информация о текущем пользователе',
		description: 'Информация о текущем авторизованном пользователе.',
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