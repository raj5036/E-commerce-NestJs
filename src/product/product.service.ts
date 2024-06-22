import { Injectable } from '@nestjs/common';
import { AddProductDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	async addProduct(dto: AddProductDTO) {
		try {
			console.log(dto);
			// const { name, description, price, image } = dto;
			// const newProduct = await this.prisma.product.create({
			// 	data: {
			// 		name,
			// 		description,
			// 		price,
			// 		image,
			// 		userId: '1',
			// 	},
			// 	select: {
			// 		id: true,
			// 		createdAt: true,
			// 	}
			// })
			// return newProduct;
			return "This action adds a new product";
		} catch (error) {
			throw error;
		}
	}
	async getProducts() {
		return 'This action returns all products';
	}

}
