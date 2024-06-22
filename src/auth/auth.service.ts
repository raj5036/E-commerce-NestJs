import { Injectable } from '@nestjs/common';
import { AuthDTO } from './dto';

@Injectable()
export class AuthService {
	async login(authDTO: AuthDTO) {
		console.log(authDTO);
		return 'login';
	}	

	async register(authDTO: AuthDTO) {
		console.log(authDTO);
		return 'register1';
	}
}
