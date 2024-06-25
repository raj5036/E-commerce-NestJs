import { Injectable } from '@nestjs/common';
import { ProductDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	async addProduct(dto: ProductDTO, userId: string) {
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
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					return {
						success: false,
						message: 'Product with this name already exists'
					}
				}
			}
			return {error};
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
			return {error};
		}
	}

	async getProductByProductId(productId: string) {
		try {
			const product = await this.prisma.product.findUnique({
				where: {
					id: productId,
				}
			})
			
			return {product};
		} catch (error) {
			return {error};
		}
	}

	async updateProduct(productId: string, dto: ProductDTO) {
		try {
			const product = await this.prisma.product.update({
				where: {
					id: productId
				},
				data: {
					...dto
				}
			});	

			return product;
		} catch (error) {
			return {error};
		}
	}

	async deleteProduct(productId: string) {
		try {
			await this.prisma.product.delete({
				where: {
					id: productId
				}
			});

			return {
				message: 'Product deleted successfully'
			};
		} catch (error) {
			 return {error};
		}
	}
}
