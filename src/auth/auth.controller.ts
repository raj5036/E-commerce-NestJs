import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	login(@Body() authDTO: AuthDTO) {
		return this.authService.login(authDTO);
	}

	@Post('register')
	register(@Body() authDTO: AuthDTO) {
		return this.authService.register(authDTO);
	}
}
