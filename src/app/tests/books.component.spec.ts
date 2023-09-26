import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { BooksComponent } from '../books/books.component'
import { BooksState } from '../books/reducers/books.reducers'
import {
  selectBooks,
  selectBooksError,
  selectBooksLoading,
} from '../books/selectors/books.selectors'

import bookDataSet from 'src/assets/data/books.json'
import { RouterModule } from '@angular/router'
import { BookItemComponent } from '../shared/book-item/book-item.component'
import { StoreModule } from '@ngrx/store'

describe('BooksComponent', () => {
  let component: BooksComponent
  let fixture: ComponentFixture<BooksComponent>
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksComponent, BookItemComponent],
      imports: [RouterModule, StoreModule],
      providers: [
        provideMockStore<BooksState>({
          initialState: {
            books: [],
            isLoaded: false,
            error: null,
          },
        }),
      ],
    })

    fixture = TestBed.createComponent(BooksComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should correctly load books from the store', () => {
    store.overrideSelector(selectBooks, bookDataSet.books)
    store.overrideSelector(selectBooksLoading, false)
    store.overrideSelector(selectBooksError, null)
    store.refreshState()

    fixture.detectChanges()

    component.books$.subscribe((books) => {
      expect(books).toEqual(bookDataSet.books)
    })
  })
})
