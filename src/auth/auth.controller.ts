import {
	Controller,
	Body,
	Post,
	HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '@users/dto/user.login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@ApiOperation({
		summary: 'Авторизация пользователя',
		description: 'Авторизация пользователя.',
	})
	@HttpCode(200)
	@Post('login')
	public async login(@Body() { email, password }: LoginUserDto) {
		const user = await this.authService.validateUser(email, password);
		return this.authService.login(user);
	}
}