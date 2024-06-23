import { IsNotEmpty, IsString } from "class-validator";

export class ProductDTO {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	price: string;

	@IsString()
	@IsNotEmpty()
	image: string;
}