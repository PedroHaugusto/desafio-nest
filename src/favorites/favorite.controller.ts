import { Controller, Post, Param, Body, HttpCode, Get, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@Controller('users/:userId/favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @HttpCode(204)
  async addFavorite(
    @Param('userId') userId: string,
    @Body() dto: AddFavoriteDto,
  ) {
    await this.favoriteService.addFavorite(userId, dto.mediaId);
  }

  @Get()
  async getFavorites(@Param('userId') userId: string) {
    return await this.favoriteService.getFavorites(userId);
  }

  @Delete('/:mediaId')
  @HttpCode(204)
  async removeFavorite(
    @Param('userId') userId: string,
    @Param('mediaId') mediaId: string,
  ) {
    await this.favoriteService.removeFavorite(userId, mediaId);
  }
}