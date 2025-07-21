import { Controller, Post, Param, Body, HttpCode, Get } from '@nestjs/common';
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
}