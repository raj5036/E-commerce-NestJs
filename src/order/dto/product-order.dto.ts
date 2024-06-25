import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ProductOrderDTO {
	@IsString()
	@IsNotEmpty()
	productId: string;

	@IsNumber()
	@IsNotEmpty()
	quantity: number
	
	@IsString()
	@IsNotEmpty()
	price: string
}