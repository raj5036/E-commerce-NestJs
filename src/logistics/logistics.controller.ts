import { Controller, Get, Param, Post, Body, UseGuards, Patch } from '@nestjs/common';
import { LogisticsService } from './logistics.service';
import { JWTGuard } from 'src/auth/guard';
import { LogisticsDTO } from './dto';
import { OrderValidityGuard } from 'src/order/guard';

@UseGuards(JWTGuard)
@Controller('logistics')
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}

  @Get('shipment/status/:trackingNumber')
  async getShipmentStatus(@Param('trackingNumber') trackingNumber: string) {
    return this.logisticsService.getShipmentStatus(trackingNumber);
  }

  @UseGuards(OrderValidityGuard)
  @Post('shipment/create')
  async createShipment(@Body() dto: LogisticsDTO) {
    return this.logisticsService.createShipment(dto);
  }

  @UseGuards(OrderValidityGuard)
  @Patch('shipment/update/:shipmentId')
  async updateShipment(@Param('shipmentId') shipmentId, @Body() dto: LogisticsDTO) {
    return this.logisticsService.updateShipment(shipmentId, dto);
  }

  @Post('shipment/cancel')
  async cancelShipment(@Body('shipmentId') shipmentId: string) {
    return this.logisticsService.cancelShipment(shipmentId);
  }
}
