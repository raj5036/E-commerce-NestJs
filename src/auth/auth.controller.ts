import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from './dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	login(@Body() loginDTO: LoginDTO) {
		return this.authService.login(loginDTO);
	}

	@Post('register')
	register(@Body() registerDTO: RegisterDTO) {
		return this.authService.register(registerDTO);
	}
}
