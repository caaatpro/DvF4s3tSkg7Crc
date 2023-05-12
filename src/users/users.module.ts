import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { AdminController } from './admin.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
	],
	controllers: [UserController, AdminController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UserModule {}