import { Injectable } from '@nestjs/common';
import { AddProductDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	async addProduct(dto: AddProductDTO, userId: string) {
		try {
			const { name, description, price, image } = dto;
			const newProduct = await this.prisma.product.create({
				data: {
					name,
					description,
					price,
					image,
					userId,
				},
				select: {
					id: true,
					createdAt: true,
				}
			})
			return newProduct;
		} catch (error) {
			throw error;
		}
	}
	async getProductsByUser(userId: string) {
		try {
			const products = await this.prisma.product.findMany({
				where: {
					userId
				},
			})
			return products;
		} catch (error) {
			throw error;
		}
	}

	async getProductByProductId(productId: string) {
		try {
			const product = await this.prisma.product.findUnique({
				where: {
					id: productId
				}
			})
			
			return {product};
		} catch (error) {
			throw error;
		}
	}
}
