import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class OrderDTO {
	@IsArray()
	@IsNotEmpty()
	products: Array<string>; // product ids

	@IsString()
	@IsNotEmpty()
	price: string;

	@IsString()
	@IsOptional()
	couponCode?: string
}