//according with the data set,json some fields are missing-> optional
export interface BookDto {
  isbn: string //assume that it is unique-id and it is the isbn-13
  title: string
  subtitle: string
  author: string
  publisher: string
  published: string
  pages: number
  description: string
  website: string
  categories?: string
  rating?: number
  isbn10?: string
  options?: string
}
