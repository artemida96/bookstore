import { createReducer, on } from '@ngrx/store'
import { BookDto } from '../dto/book.dto'
import {
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
  on(loadBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    loading: false,
  })),
  on(loadBooksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
)
