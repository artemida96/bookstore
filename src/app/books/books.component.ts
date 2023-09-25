import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  selectBooks,
  selectBooksError,
  selectBooksLoading,
} from './selectors/books.selectors'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow overflow-hidden p-6 bg-gray-200 ',
  },
})
export class BooksComponent {
  books$ = this.store.select(selectBooks)
  loading$ = this.store.select(selectBooksLoading)
  error$ = this.store.select(selectBooksError)

  rating = Array.from({ length: 5 }, (_, index) => index + 1)

  constructor(private store: Store) {}
}
