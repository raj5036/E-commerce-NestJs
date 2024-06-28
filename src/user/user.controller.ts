import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminGuard } from './guard';
import { UserService } from './user.service';
import { JWTGuard } from 'src/auth/guard';

@UseGuards(JWTGuard, AdminGuard)
@Controller('user')
export class UserController {
	constructor(
		private userService: UserService
	) {}

	@Get('get-all')
	getAll() {
		return this.userService.getAll();
	}
	
	@Get(':userId')
	getUser(@Param('userId') userId: string) {
		return this.userService.getUser(userId);
	}
}
