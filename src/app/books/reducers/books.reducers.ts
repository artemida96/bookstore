import { createReducer, on } from '@ngrx/store'
import {
  addBooks,
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess,
  setSearchTerm,
  updateFilter,
} from '../actions/books.actions'
import { BookDto } from '../dto/book.dto'
import { CreateBookDto } from '../dto/create-book.dto'

export interface BooksState {
  books: BookDto[]
  loading: boolean
  error?: any
  filterCriteria?: CreateBookDto
  search?: string
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
    return { ...state, books: [...state.books, ...updatedBooks] }
  }),
  on(setSearchTerm, (state, action) => ({
    ...state,
    search: action.searchTerm,
  })),
  on(updateFilter, (state, action) => {
    return {
      ...state,
      filterCriteria: action.filterCriteria,
    }
  })
)
