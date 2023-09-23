import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  selectBooks,
  selectBooksError,
  selectBooksLoading,
} from './selectors/books.selectors'
import { loadBooks } from './actions/books.actions'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow overflow-hidden',
  },
})
export class BooksComponent implements OnInit {
  books$ = this.store.select(selectBooks)
  loading$ = this.store.select(selectBooksLoading)
  error$ = this.store.select(selectBooksError)

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadBooks())
  }
}
