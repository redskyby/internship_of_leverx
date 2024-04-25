import { Test, TestingModule } from '@nestjs/testing';
import { VinylsController } from './vinyls.controller';
import { VinylsService } from './vinyls.service';

describe('VinylsController', () => {
  let controller: VinylsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VinylsController],
      providers: [VinylsService],
    }).compile();

    controller = module.get<VinylsController>(VinylsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
