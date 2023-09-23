import { Injectable } from '@angular/core'
import { BooksApiService } from '../services/books-api.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess,
} from '../actions/books.actions'
import { catchError, map, of, switchMap } from 'rxjs'

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private bookService: BooksApiService
  ) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      switchMap(() =>
        this.bookService.getAllBooks().pipe(
          map(({ books }) => {
            return loadBooksSuccess({ books })
          }),
          catchError((error) => of(loadBooksFailure({ error })))
        )
      )
    )
  )
}
