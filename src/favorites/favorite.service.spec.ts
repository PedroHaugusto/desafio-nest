import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from './favorite.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('FavoriteService', () => {
    let service: FavoriteService;
    let prisma: PrismaService;

    const prismaMock = {
        media: { findUnique: jest.fn() },
        user: { upsert: jest.fn() },
        favorite: { create: jest.fn() },
    } as any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FavoriteService,
                { provide: PrismaService, useValue: prismaMock },
            ],
        }).compile();

        service = module.get<FavoriteService>(FavoriteService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve adicionar um favorito se a mídia existir', async () => {
        (prisma.media.findUnique as jest.Mock).mockResolvedValue({ id: 'media-id' });
        (prisma.user.upsert as jest.Mock).mockResolvedValue({ id: 'user-id' });
        (prisma.favorite.create as jest.Mock).mockResolvedValue({ userId: 'user-id', mediaId: 'media-id' });

        await expect(service.addFavorite('user-id', 'media-id')).resolves.not.toThrow();
        expect(prisma.media.findUnique).toHaveBeenCalledWith({ where: { id: 'media-id' } });
        expect(prisma.user.upsert).toHaveBeenCalled();
        expect(prisma.favorite.create).toHaveBeenCalledWith({ data: { userId: 'user-id', mediaId: 'media-id' } });
    });

    it('deve lançar NotFoundException se a mídia não existir', async () => {
        (prisma.media.findUnique as jest.Mock).mockResolvedValue(null);
        await expect(service.addFavorite('user-id', 'media-id')).rejects.toThrow(NotFoundException);
    });

    it('deve lançar ConflictException se o favorito já existir', async () => {
        (prisma.media.findUnique as jest.Mock).mockResolvedValue({ id: 'media-id' });
        (prisma.user.upsert as jest.Mock).mockResolvedValue({ id: 'user-id' });
        (prisma.favorite.create as jest.Mock).mockRejectedValue({ code: 'P2002' });
        await expect(service.addFavorite('user-id', 'media-id')).rejects.toThrow(ConflictException);
    });
});