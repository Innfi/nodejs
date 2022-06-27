import { Injectable } from "@nestjs/common";

import { GenreEntity } from "../db/genre.entity";
import { CreateGenreDto } from "../user/dto/create-genre.dto";

@Injectable()
export class GenreService {
  async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {
    const genreEntity: GenreEntity = GenreEntity.create();
    const { type } = genreDetails;

    genreEntity.type = type;
    await GenreEntity.save(genreEntity);
    return genreEntity;
  }

  async getGenres(): Promise<GenreEntity[]> {
    return await GenreEntity.find();
  }
}