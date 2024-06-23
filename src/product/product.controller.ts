import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductDTO } from './dto';
import { ProductService } from './product.service';
import { JWTGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { ProductAvailabilityGuard, ProductIdValidationGuard } from './guard';
@UseGuards(JWTGuard)
@Controller('product')
export class ProductController {
	constructor(
		private productService: ProductService,
	) {}

	@Post('add')
	addProduct(@Body() dto: ProductDTO,  @GetUser('id') userId: string) {
		return this.productService.addProduct(dto, userId);
	}

	@Get('all')
	getAllProductsByUser(@GetUser('id') userId: string) {
		return this.productService.getProductsByUser(userId);
	}

	@UseGuards(ProductIdValidationGuard)
	@Get(':productId')
	getOneProduct(@Param('productId') productId: string) {
		return this.productService.getProductByProductId(productId);
	}

	@UseGuards(ProductIdValidationGuard)
	@UseGuards(ProductAvailabilityGuard)
	@Patch(':productId')
	updateProduct(@Param('productId') productId: string, @Body() dto: ProductDTO) {
		return this.productService.updateProduct(productId, dto);
	}

	@UseGuards(ProductIdValidationGuard)
	@UseGuards(ProductAvailabilityGuard)
	@Delete(':productId')
	deleteProduct(@Param('productId') productId: string) {
		return this.productService.deleteProduct(productId);
	}
}
