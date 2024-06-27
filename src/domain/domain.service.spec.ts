// src/domain/domain.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';

describe('DomainController', () => {
  let controller: DomainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomainController],
      providers: [
        {
          provide: DomainService,
          useValue: {
            getAllDomains: jest.fn().mockResolvedValue([
              { id: 1, name: 'example.com', status: 'available' },
              { id: 2, name: 'example.org', status: 'registered' },
            ]),
            checkDomainAvailability: jest.fn().mockResolvedValue({
              id: 1, name: 'example.com', status: 'available'
            }),
            registerDomain: jest.fn().mockResolvedValue({
              message: 'Domain registered successfully'
            }),
            getAllRegistrations: jest.fn().mockResolvedValue([
              { id: 1, domain: 'example.com', owner: 'John Doe', registrationDate: '2023-01-01' }
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<DomainController>(DomainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all domains', async () => {
    expect(await controller.getAllDomains()).toEqual([
      { id: 1, name: 'example.com', status: 'available' },
      { id: 2, name: 'example.org', status: 'registered' },
    ]);
  });

  it('should check domain availability', async () => {
    expect(await controller.checkDomainAvailability(1)).toEqual({
      id: 1, name: 'example.com', status: 'available'
    });
  });

  it('should register a domain', async () => {
    const body = { domain: 'example.com', owner: 'John Doe' };
    expect(await controller.registerDomain(body.domain, body.owner)).toEqual({
      message: 'Domain registered successfully'
    });
  });

  it('should get all registrations', async () => {
    expect(await controller.getAllRegistrations()).toEqual([
      { id: 1, domain: 'example.com', owner: 'John Doe', registrationDate: '2023-01-01' }
    ]);
  });
});
