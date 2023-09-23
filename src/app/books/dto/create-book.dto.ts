import { BookDto } from './book.dto'

export interface CreateBookDto extends BookDto {
  id: string
}
