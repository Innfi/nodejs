export class CreateBookDto {
  readonly name: string;
  readonly userId: number;
  readonly genreIds: number[];
}
