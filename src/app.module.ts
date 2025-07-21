import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module';
import { MediaController } from './media/media.controller';
import { MediaService } from './media/media.service';
import { PrismaService } from './prisma.service';
import { FavoriteController } from './favorites/favorite.controller';
import { FavoriteService } from './favorites/favorite.service';

@Module({
  imports: [MediaModule],
  controllers: [ MediaController, FavoriteController],
  providers: [ MediaService, PrismaService, FavoriteService],
})
export class AppModule {}
