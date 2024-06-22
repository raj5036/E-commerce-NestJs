import { Injectable } from '@nestjs/common';
import { AddProductDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	async addProduct(dto: AddProductDTO, user: User) {
		try {
			console.log(user);
			const { name, description, price, image } = dto;
			const newProduct = await this.prisma.product.create({
				data: {
					name,
					description,
					price,
					image,
					userId: user.id,
				},
				select: {
					id: true,
					createdAt: true,
				}
			})
			return newProduct;
			// return {msg: "This action adds a new product", user};
		} catch (error) {
			throw error;
		}
	}
	async getProducts() {
		return 'This action returns all products';
	}

}
