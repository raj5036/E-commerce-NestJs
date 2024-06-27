// src/domain/domain.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DomainService {
	apiUrl: string;
	constructor(
		private readonly httpService: HttpService,
		private config: ConfigService,
	) {
		this.apiUrl = `${this.config.get('HOST')}:${this.config.get('PORT')}/api/domain`;
	}

	async getAllDomains() {
		const response = await firstValueFrom(this.httpService.get(`${this.apiUrl}`));
		return response.data;
	}

	async checkDomainAvailability(domainId: number) {
		const response = await firstValueFrom(this.httpService.get(`${this.apiUrl}/${domainId}`));
		return response.data;
	}

	async registerDomain(domain: string, owner: string) {
		const response = await firstValueFrom(
		this.httpService.post(`${this.apiUrl}/register`, { domain, owner })
		);
		return response.data;
	}

	async getAllRegistrations() {
		const response = await firstValueFrom(this.httpService.get(`${this.apiUrl}/registrations`));
		return response.data;
	}
}
