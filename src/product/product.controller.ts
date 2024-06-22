import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AddProductDTO } from './dto';
import { ProductService } from './product.service';
import { JWTGuard } from 'src/auth/guard';

@UseGuards(JWTGuard)
@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Post('add')
	addProduct(@Body() dto: AddProductDTO) {
		return this.productService.addProduct(dto);
	}

	@Get('all')
	getAllProductsByUser() {}

	@Patch('update')
	updateProduct() {}

	@Delete('delete')
	deleteProduct() {}
}
