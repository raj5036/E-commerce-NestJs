import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { ProductOrderDTO } from "./product-order.dto";

export class OrderDTO {
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({each: true, message: `Each Product must be an object of type ${JSON.stringify({
		productId: 'string',
		quantity: 'number',
		price: 'string'
	})}`})
	@Type(() => ProductOrderDTO)
	products: ProductOrderDTO[];

	@IsString()
	@IsNotEmpty()
	price: string;

	@IsString()
	@IsOptional()
	couponCode?: string
}