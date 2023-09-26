/**
 * effect listens for the 'loadBooks' action and call the endpoint
 * to retrieve a list of books.Upon success, it dispatches
 * a 'loadBooksSuccess' action with the retrieved books. If an error occurs during
 * the HTTP request, it dispatches a 'loadBooksFailure' action with the error details.
 *
 * This effect uses the 'switchMap' operator to ensure that only one HTTP request is
 * in progress at a time, and in combination with 'combineLatestFrom' & 'filter' loads the books one time.
 */
import { Injectable } from '@angular/core'
import { BooksApiService } from '../services/books-api.service'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import {
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess,
} from '../actions/books.actions'
import {
  catchError,
  filter,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs'
import { selectBooksLoading } from '../selectors/books.selectors'
import { Store } from '@ngrx/store'

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private bookService: BooksApiService,
    private store: Store
  ) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      concatLatestFrom(() => this.store.select(selectBooksLoading)),
      filter(([, isLoaded]) => !isLoaded),
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
