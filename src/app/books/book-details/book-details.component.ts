import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, switchMap, take } from 'rxjs'
import { selectBookById, selectBooks } from '../selectors/books.selectors'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow overflow-hidden ',
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
  ) {}
}