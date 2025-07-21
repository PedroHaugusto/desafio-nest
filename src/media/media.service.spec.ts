import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { PrismaService } from '../prisma.service';

describe('MediaService', () => {
  let service: MediaService;
  let prisma: PrismaService;

  const prismaMock = {
    media: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve adicionar uma mídia ao catálogo', async () => {
    const dto = {
      title: 'Test',
      description: 'Desc',
      type: "movie" as "movie",
      releaseYear: 2025,
      genre: 'Ação',
    };
    (prisma.media.create as jest.Mock).mockResolvedValue({ id: '1', ...dto });
    const result = await service.create(dto);
    expect(result).toEqual({ id: '1', ...dto });
    expect(prisma.media.create).toHaveBeenCalledWith({ data: dto });
  });
});