import { TestBed, waitForAsync } from '@angular/core/testing'
import { BooksApiService } from '../books/services/books-api.service'
import { HttpClientModule } from '@angular/common/http'

import books from 'src/assets/data/books.json'

describe('BooksApiService', () => {
  let booksApiService: BooksApiService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BooksApiService],
    })
    booksApiService = TestBed.inject(BooksApiService)
  }))

  it('should create the book api service component', () => {
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
