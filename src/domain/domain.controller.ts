import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DomainService } from './domain.service';

@Controller('domain')
export class DomainController {
	constructor(private readonly domainService: DomainService) {}

	@Get()
	async getAllDomains() {
		return this.domainService.getAllDomains();
	}

	@Get(':id')
	async checkDomainAvailability(@Param('id') domainId: number) {
		return this.domainService.checkDomainAvailability(domainId);
	}

	@Post('register')
	async registerDomain(@Body('domain') domain: string, @Body('owner') owner: string) {
		return this.domainService.registerDomain(domain, owner);
	}

	@Get('registrations')
	async getAllRegistrations() {
		return this.domainService.getAllRegistrations();
	}
}
