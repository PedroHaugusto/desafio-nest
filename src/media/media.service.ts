import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMediaDto: CreateMediaDto) {
    return this.prisma.media.create({
      data: createMediaDto,
    });
  }

  async findAll() {
    return this.prisma.media.findMany();
  }

  async findOne(id: string) {
  const media = await this.prisma.media.findUnique({ where: { id } });
  if (!media) {
    throw new NotFoundException('Mídia não encontrada');
  }
  return media;
  }
}