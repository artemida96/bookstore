import { createAction, props } from '@ngrx/store'
import { CreateBookDto } from '../dto/create-book.dto'
import { BookDto } from '../dto/book.dto'

export const loadBooks = createAction('[Book] Load Books')

export const loadBooksSuccess = createAction(
  '[Book] Load Books Success',
  props<{ books: BookDto[] }>()
)

export const loadBooksFailure = createAction(
  '[Book] Load Books Failure',
  props<{ error: any }>()
)

export const addBooks = createAction(
  '[Book] Add Books',
  props<{ books: CreateBookDto[] }>()
)

export const setSearchTerm = createAction(
  '[Search] Set Search Term',
  props<{ searchTerm?: string }>()
)
export const updateFilter = createAction(
  '[Filter] Update Filter',
  props<{ filterCriteria?: CreateBookDto }>()
)
