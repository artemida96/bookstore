import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { setSearchTerm, updateFilter } from '../actions/books.actions'
import {
  selectFilteredBooks,
  selectFilteredBooksBySearch,
  selectSearchTerm,
} from '../selectors/books.selectors'
import {
  Observable,
  Subject,
  combineLatest,
  mergeMap,
  of,
  startWith,
  takeUntil,
} from 'rxjs'
import { BookDto } from '../dto/book.dto'
import { NavigationEnd, Router } from '@angular/router'
import { FormFieldConfig } from 'src/app/shared/form/types/form-field-config.type'

/*Filters: Books can be filtered either by the search input or by using the 
 filter panel form, but not both simultaneously.
 In either case, applying one filter type excludes the other.*/

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow overflow-hidden p-6 bg-gray-200',
  },
})
export class SearchBooksComponent implements OnInit {
  filteredBooks$ = this.store.select(selectFilteredBooks)

  filteredBooksBySearch$ = this.store.select(selectFilteredBooksBySearch)

  combinedFilteredBooks$: Observable<BookDto[]> | undefined

  private unsubscribe$ = new Subject<void>()

  rating = Array.from({ length: 5 }, (_, index) => index + 1)

  formFields: FormFieldConfig[] = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'categories',
      label: 'Categories',
      type: 'text',
    },
    {
      name: 'author',
      label: 'Author Name',
      type: 'text',
    },
    {
      name: 'publisher',
      label: 'Publisher',
      type: 'text',
    },
    {
      name: 'published',
      label: 'Year',
      type: 'number',
    },
    {
      name: 'pages',
      label: 'Page Numbers',
      type: 'number',
    },
    {
      name: 'options',
      label: 'Options',
      type: 'text',
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'number',
    },
    {
      name: 'isbn10',
      label: 'ISBN-10',
      type: 'text',
    },
    {
      name: 'isbn',
      label: 'ISBN-13',
      type: 'text',
    },
  ]

  ngOnInit(): void {
    this.initFilterForm()
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
    private router: Router
  ) {}

  initFilterForm() {
    this.filterForm = this.fb.group({})
    this.formFields.forEach((field) => {
      this.filterForm?.addControl(field.name, this.fb.control(''))
    })
  }
  resetFilters() {
    this.initFilterForm()
    this.store.dispatch(updateFilter({ filterCriteria: undefined }))
  }

  //apply filters will clear the search input
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

  goToBookDetails(isbn: string) {
    this.router.navigate(['/home/category', isbn])
  }

  //apply search will ignore extra filters from the filter panel
  search() {
    this.store.dispatch(setSearchTerm({ searchTerm: this.searchTerm }))
    this.filteredBooks$ = this.store.select(selectFilteredBooksBySearch)
  }

  clearSearch() {
    this.searchTerm = ''
    this.search()
  }
}
