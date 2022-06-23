import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateGenreDto } from "src/user/dto/create-genre.dto";

import { GenreService } from "./genre.service";

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post('post')
  postGenre(@Body() genre: CreateGenreDto) {
    return this.genreService.insert(genre);
  }

  @Get()
  getGenres() {
    return this.genreService.getGenres();
  }
}