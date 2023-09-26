/*according with the create book these fields are mandatory
 so created a new dto to avoid type check errors*/

import { BookDto } from './book.dto'

export interface CreateBookDto extends BookDto {
  categories: string
  rating?: number
  isbn10: string
  options?: string
  img?: string
}
