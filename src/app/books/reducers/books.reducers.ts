import { createReducer, on } from '@ngrx/store'
import { BookDto } from '../dto/book.dto'
import {
  addBooks,
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess,
} from '../actions/books.actions'

export interface BooksState {
  books: BookDto[]
  loading: boolean
  error: any
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
}

export const booksReducer = createReducer(
  initialState,
  on(loadBooks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadBooksSuccess, (state, action) => ({
    ...state,
    books: action.books,
    loading: false,
  })),
  on(loadBooksFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(addBooks, (state, action) => {
    const updatedBooks = action.books.map((book) => ({
      ...book,
      isbn: book.isbn13.toString(), //because of the book-details needs  id-> unique isbn= isbn13?
      isbn10: book.isbn10.toString(),
      isbn13: book.isbn13.toString(),
    }))
    console.log({ ...state, books: [...state.books, ...updatedBooks] })
    return { ...state, books: [...state.books, ...updatedBooks] }
  })
)
