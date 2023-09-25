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
    return { ...state, books: [...state.books, ...action.books] }
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
