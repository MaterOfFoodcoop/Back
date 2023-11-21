import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('Environment Variables', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  it('should have DATABASE_HOST', () => {
    expect(configService.get<string>('DATABASE_HOST')).toBeDefined();
  });

  it('should have DATABASE_NAME', () => {
    expect(configService.get<string>('DATABASE_NAME')).toBeDefined();
  });

  it('should have DATABASE_PASSWORD', () => {
    expect(configService.get<string>('DATABASE_PASSWORD')).toBeDefined();
  });

  it('should have DATABASE_DB', () => {
    expect(configService.get<string>('DATABASE_DB')).toBeDefined();
  });
});
