import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(userId: string, mediaId: string) {
    const media = await this.prisma.media.findUnique({ where: { id: mediaId } });
    if (!media) throw new NotFoundException('Mídia não encontrada');

    await this.prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId },
    });

    try {
      await this.prisma.favorite.create({
        data: { userId, mediaId },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('O favorito já existe');
      }
      throw error;
    }
  }
}