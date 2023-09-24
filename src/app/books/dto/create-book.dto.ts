//according with the create book these fields are mandatory

import { BookDto } from './book.dto'

export interface CreateBookDto extends BookDto {
  categories: string
  rating?: number
  isbn10: string
  isbn13: string
  options?: string
  img?: string
}
