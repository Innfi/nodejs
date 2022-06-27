import { BookEntity } from "../db/book.entity";
import { GenreEntity } from "../db/genre.entity";
import { UserEntity } from "../db/user.entity";
import { CreateBookDto } from "../user/dto/create-book.dto";


export class BookService {
  async insert(bookDetail: CreateBookDto): Promise<BookEntity> {
    const { name, userId, genreIds } = bookDetail;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne({ where: { id: userId } });

    for (const genreId of genreIds) {
      const genre = await GenreEntity.findOne({ where: { id: genreId} });
      book.genres.push(genre);
    }

    await book.save();

    return book;
  }

  async getBooks(): Promise<BookEntity[]> {
    return BookEntity.find();
  }
}