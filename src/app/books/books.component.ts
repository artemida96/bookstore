import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  selectBooks,
  selectBooksError,
  selectBooksLoading,
} from './selectors/books.selectors'
import { loadBooks } from './actions/books.actions'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow overflow-hidden p-6',
  },
})
export class BooksComponent implements OnInit {
  books$ = this.store.select(selectBooks)
  loading$ = this.store.select(selectBooksLoading)
  error$ = this.store.select(selectBooksError)

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.store.dispatch(loadBooks())
  }

  goToBookDetails(isbn: string) {
    this.router.navigate(['/home/category', isbn])
  }
}
