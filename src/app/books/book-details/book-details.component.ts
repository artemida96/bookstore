import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable, defer, map, switchMap, tap } from 'rxjs'
import {
  selectBookById,
  selectBooks,
  selectBooksBySameCategories,
} from '../selectors/books.selectors'
import { ActivatedRoute } from '@angular/router'
import { loadBooks } from '../actions/books.actions'
import { BookDto } from '../dto/book.dto'

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow overflow-hidden p-6 bg-gray-200',
  },
})
export class BookDetailsComponent {
  private bookIdSubject = new BehaviorSubject<string>('')
  sameBooksByCategory$: Observable<BookDto[]>

  book$ = this.route.params.pipe(
    map((params) => params['isbn']),
    tap((bookId) => this.bookIdSubject.next(bookId)),
    switchMap((bookId) => this.store.select(selectBookById(bookId)))
  )

  rating = Array.from({ length: 5 }, (_, index) => index + 1)

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.sameBooksByCategory$ = this.bookIdSubject.pipe(
      switchMap((bookId) => {
        if (!bookId) {
          return []
        }
        return this.store.select(selectBooksBySameCategories(bookId))
      })
    )
  }
}
