// book.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BooksState } from '../reducers/books.reducers'

export const selectBookState = createFeatureSelector<BooksState>('books')

export const selectBooks = createSelector(
  selectBookState,
  (state) => state.books
)

export const selectBooksLoading = createSelector(
  selectBookState,
  (state) => state.loading
)

export const selectBooksError = createSelector(
  selectBookState,
  (state) => state.error
)
