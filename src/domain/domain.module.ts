import { Module } from '@nestjs/common';
import { DomainController } from './domain.controller';
import { HttpModule } from '@nestjs/axios';
import { DomainService } from './domain.service';

@Module({
  imports: [HttpModule.register({ timeout: 5000 })],
  controllers: [DomainController],
  providers: [DomainService],
})
export class DomainModule {}
