import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, switchMap } from 'rxjs'
import { selectBookById, selectBooks } from '../selectors/books.selectors'
import { ActivatedRoute } from '@angular/router'
import { loadBooks } from '../actions/books.actions'

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
  book$ = this.route.params.pipe(
    map((params) => params['isbn']),
    switchMap((bookId) => this.store.select(selectBookById(bookId)))
  )

  books$ = this.store.select(selectBooks)

  rating = Array.from({ length: 5 }, (_, index) => index + 1)

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}
}
