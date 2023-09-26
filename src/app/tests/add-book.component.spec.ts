/*import { RouterModule } from '@angular/router'
import { addBooks } from '../books/actions/books.actions'
import { AddBookComponent } from '../books/add-book/add-book.component'
import { CreateBookDto } from '../books/dto/create-book.dto'
import { BooksState, booksReducer } from '../books/reducers/books.reducers'
import { IconsModule } from '../shared/icons/icons.module'
import { Store, StoreModule, select } from '@ngrx/store'
import { HttpClientModule } from '@angular/common/http'
import { FormModule } from '../shared/form/form-module.module'
import { ReactiveFormsModule } from '@angular/forms'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  waitForAsync,
} from '@angular/core/testing'
import { BookFormComponent } from '../books/add-book/components/book-form.component'
import { selectBooks } from '../books/selectors/books.selectors'
import { BookDto } from '../books/dto/book.dto'
import { BooksModule } from '../books/books.module'
import { EffectsModule } from '@ngrx/effects'

describe('AddBookComponent', () => {
  let component: AddBookComponent
  let fixture: ComponentFixture<AddBookComponent>
  let store: MockStore

  beforeEach(() => {
    const initialState: BooksState = {
      books: [],
      loading: false,
      error: null,
    }

    TestBed.configureTestingModule({
      declarations: [AddBookComponent, BookFormComponent],
      imports: [
        RouterModule,
        StoreModule,
        IconsModule,
        HttpClientModule,
        FormModule,
        IconsModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideMockStore<BooksState>({
          initialState,
        }),
      ],
    })

    store = TestBed.inject(Store) as MockStore
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should dispatch an action and update the store state', (done) => {
    // Define a sample book to add
    const addBook: CreateBookDto = {
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
      website: '',
      subtitle: '',
    }

    store.overrideSelector(selectBooks, [] as BookDto[])

    store.addReducer()

    store.dispatch(addBooks({ books: [addBook] }))

    store.select(selectBooks).subscribe((stateBooks: BookDto[]) => {
      expect(stateBooks.length).toBe(1) // The state should have 1 book
      done()
    })

    // Assert that the store state has two books now (initial book + added book)
    //expect(books.length).toBe(0)
  })
})*/
