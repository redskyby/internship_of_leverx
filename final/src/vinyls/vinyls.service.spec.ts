import { Test, TestingModule } from '@nestjs/testing';
import { VinylsService } from './vinyls.service';

describe('VinylsService', () => {
  let service: VinylsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VinylsService],
    }).compile();

    service = module.get<VinylsService>(VinylsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
