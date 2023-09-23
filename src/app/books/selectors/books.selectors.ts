// book.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BooksState } from '../reducers/books.reducers'

export const selectBooksState = createFeatureSelector<BooksState>('books')

export const selectBooks = createSelector(
  selectBooksState,
  (state) => state.books
)

export const selectBooksLoading = createSelector(
  selectBooksState,
  (state) => state.loading
)

export const selectBooksError = createSelector(
  selectBooksState,
  (state) => state.error
)

export const selectBookById = (bookId: string) =>
  createSelector(selectBooksState, (state) =>
    state.books.find((book) => book.isbn === bookId)
  )
