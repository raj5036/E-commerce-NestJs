import { Module } from '@nestjs/common';
import { LogisticsService } from './logistics.service';
import { LogisticsController } from './logistics.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({timeout: 5000, maxRedirects: 5})],
  providers: [LogisticsService],
  controllers: [LogisticsController],
  exports: [LogisticsService],
})
export class LogisticsModule {}
