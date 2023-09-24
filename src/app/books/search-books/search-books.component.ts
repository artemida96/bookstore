import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import {
  loadBooks,
  setSearchTerm,
  updateFilter,
} from '../actions/books.actions'
import { CreateBookDto } from '../dto/create-book.dto'
import {
  selectBooks,
  selectFilterCriteria,
  selectFilteredBooks,
  selectFilteredBooksBySearch,
  selectSearchTerm,
} from '../selectors/books.selectors'
import {
  Observable,
  Subject,
  combineLatest,
  forkJoin,
  map,
  mergeMap,
  of,
  startWith,
  takeUntil,
} from 'rxjs'
import { BookDto } from '../dto/book.dto'
import { NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex flex-col flex-grow overflow-hidden p-6 min-h-screen bg-gray-100',
  },
})
export class SearchBooksComponent implements OnInit {
  filteredBooks$ = this.store.select(selectFilteredBooks)

  filteredBooksBySearch$ = this.store.select(selectFilteredBooksBySearch)

  combinedFilteredBooks$: Observable<BookDto[]> | undefined

  private unsubscribe$ = new Subject<void>()

  ngOnInit(): void {
    this.initBookForm()
    const searchTerm$ = this.store.select(selectSearchTerm).pipe(startWith(''))

    // Listen for router navigation end events
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Reset filters when navigation ends (leaving the page)
        this.resetFilters()
      }
    })

    this.combinedFilteredBooks$ = combineLatest([
      searchTerm$,
      this.filteredBooks$,
      this.filteredBooksBySearch$,
    ]).pipe(
      mergeMap(([searchTerm, filteredBooks, filteredBooksBySearch]) => {
        if (searchTerm) {
          return of(filteredBooksBySearch)
        } else {
          return of(filteredBooks)
        }
      })
    )
  }

  filterForm?: FormGroup

  searchTerm: string = ''

  showFilters = false

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router // Inject the Router service
  ) {}

  initBookForm() {
    this.filterForm = this.fb.group({
      categories: [undefined],
      published: undefined,
      author: undefined,
      title: undefined,
      isbn: undefined,
      isbn10: undefined,
      isbn13: undefined,
      pages: undefined,
      publisher: undefined,
      description: undefined,
      rating: undefined,
    })
  }
  resetFilters() {
    this.initBookForm()
    this.store.dispatch(updateFilter({ filterCriteria: undefined }))
  }

  applyFilters() {
    this.clearSearch()
    const filterCriteria = this.filterForm?.value
    this.store.dispatch(updateFilter({ filterCriteria }))
  }

  toggleFilters() {
    this.showFilters = !this.showFilters
  }

  isFormUnchanged(): boolean {
    if (!this.filterForm) {
      return true
    }
    const currentFormValues = this.filterForm.value
    return Object.values(currentFormValues).every(
      (value) => value === null || value === ''
    )
  }

  search() {
    this.store.dispatch(setSearchTerm({ searchTerm: this.searchTerm }))
    this.filteredBooks$ = this.store.select(selectFilteredBooksBySearch)
  }

  clearSearch() {
    this.searchTerm = ''
    this.search()
  }
}
