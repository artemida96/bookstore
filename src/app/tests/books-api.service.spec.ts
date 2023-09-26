import { TestBed } from '@angular/core/testing'
import { BooksApiService } from '../books/services/books-api.service'
import { HttpClientModule } from '@angular/common/http'

import books from 'src/assets/data/books.json'

describe('BooksApiService', () => {
  let booksApiService: BooksApiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BooksApiService],
    })
    booksApiService = TestBed.inject(BooksApiService)
  })

  it('should be created', () => {
    expect(BooksApiService).toBeTruthy()
  })

  it('should return the book data set', (done) => {
    const mockBooksResponse = { books: books.books }

    const result = booksApiService.getAllBooks()
    result.subscribe((data) => {
      expect(data).toEqual(mockBooksResponse)
      done()
    })
  })
})
