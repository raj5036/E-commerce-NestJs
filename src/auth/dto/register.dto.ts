import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDTO {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsNotEmpty()
	firstname: string;

	@IsString()
	@IsNotEmpty()
	lastname: string;
}