import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import {
  Store,
  StoreModule,
  createFeatureSelector,
  createSelector,
  select,
} from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { HttpClientModule } from '@angular/common/http'
import { IconsModule } from '../shared/icons/icons.module'
import { FormModule } from '../shared/form/form-module.module'
import { AddBookComponent } from '../books/add-book/add-book.component'
import { BookFormComponent } from '../books/add-book/components/book-form.component'
import { CreateBookDto } from '../books/dto/create-book.dto'
import { BooksState, booksReducer } from '../books/reducers/books.reducers'
import { addBooks } from '../books/actions/books.actions'
import { BookDto } from '../books/dto/book.dto'

import bookDataSet from 'src/assets/data/books.json'

const selectBooksFeature = createFeatureSelector<BooksState>('books') //define the selector
export const selectBooks = createSelector(
  selectBooksFeature,
  (state: BooksState) => state.books
)

describe('AddBookComponent', () => {
  let component: AddBookComponent
  let fixture: ComponentFixture<AddBookComponent>
  let store: MockStore<BooksState>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookComponent, BookFormComponent],
      imports: [
        RouterModule,
        StoreModule,
        IconsModule,
        HttpClientModule,
        FormModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideMockStore<BooksState>({
          initialState: {
            books: [],
            isLoaded: false,
            error: null,
          },
        }),
      ],
    }).compileComponents()

    store = TestBed.inject(Store) as MockStore<BooksState>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the add book component', () => {
    expect(component).toBeTruthy()
  })

  it('should add extra books to the book list', () => {
    const addBook: CreateBookDto[] = [
      {
        isbn: '9781234567890',
        title: 'Domain-Driven Design with Angular and Monorepos',
        author: 'Artemis Maria Chatziroufa',
        publisher: 'Angular Workshops',
        published: '2023',
        pages: 200,
        description:
          'Ideas from DDD help developers to manage and scale with the resulting complexity.',
        categories: 'Frontend, Tactical Design, Monorepos',
        rating: 5,
        isbn10: '1234567890',
        options: 'Angular Options',
        subtitle: '',
        website: '',
      },
    ]

    //we update the state books with our data set books
    store.overrideSelector(selectBooks, bookDataSet.books)

    store.refreshState()

    fixture.detectChanges()

    store.dispatch(addBooks({ books: addBook }))

    store.select(selectBooks).subscribe((valueBooks: BookDto[]) => {
      const newBooks = [...valueBooks, ...addBook]

      expect(newBooks.length).toBe(valueBooks.length + 1)
    })
  })
})
