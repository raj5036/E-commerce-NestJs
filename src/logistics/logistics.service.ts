import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { LogisticsDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LogisticsService {
	constructor(
		private config: ConfigService,
		private httpService: HttpService,
		private prisma: PrismaService,
	) {}
	private readonly apiUrl = `${this.config.get('HOST')}${this.config.get('PORT')}/api/logistics`;

	async getShipmentStatus(trackingNumber: string) {
		try {
			const shipment = await this.prisma.shipment.findFirst({
				where: {
					trackingNumber
				}
			})

			return {
				...shipment
			}
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async createShipment(dto: LogisticsDTO): Promise<any> {
		try {
			const shipment = await this.prisma.shipment.create({
				data: dto,
			})

			return {shipment};
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async updateShipment(shipmentId: string, dto: LogisticsDTO) {
		try {
			const shipment = await this.prisma.shipment.update({
				where: {
					id: shipmentId
				},
				data: {
					...dto
				}
			})

			return {shipment};
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async cancelShipment(shipmentId: string) {
		try {
			await this.prisma.shipment.update({
				where: {
					id: shipmentId
				},
				data: {
					isCanceled: true
				}
			})

			return {
				success: true,
				message: 'Shipment canceled successfully'
			}
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}
}
