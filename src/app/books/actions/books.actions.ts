import { createAction, props } from '@ngrx/store'
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
