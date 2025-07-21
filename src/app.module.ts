import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module';
import { MediaController } from './media/media.controller';
import { MediaService } from './media/media.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [MediaModule],
  controllers: [ MediaController,],
  providers: [ MediaService, PrismaService],
})
export class AppModule {}
