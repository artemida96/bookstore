import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, switchMap, take, withLatestFrom } from 'rxjs'
import { selectBookById, selectBooks } from '../selectors/books.selectors'
import { ActivatedRoute } from '@angular/router'
import { loadBooks } from '../actions/books.actions'

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow overflow-hidden p-6',
  },
})
export class BookDetailsComponent {
  book$ = this.route.params.pipe(
    map((params) => params['isbn']),
    switchMap((bookId) => this.store.select(selectBookById(bookId)))
  )

  books$ = this.store.select(selectBooks)

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.books$
      .pipe(take(1), withLatestFrom(this.books$))
      .subscribe(([books, book]) => {
        if (!books.length && !book) {
          this.store.dispatch(loadBooks())
        }
      })
  }
}
