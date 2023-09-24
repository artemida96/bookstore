import { BookDto } from './book.dto'

export interface CreateBookDto extends BookDto {
  id: string
  categories: string
  rating: number
  isbn10: string
  isbn13: string
  options: string
}
