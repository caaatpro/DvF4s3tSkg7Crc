import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './admin.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
	],
	controllers: [UserController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UserModule {}