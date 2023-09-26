import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router'
import { By } from '@angular/platform-browser'
import { BookItemComponent } from '../shared/book-item/book-item.component'
import { BookDto } from '../books/dto/book.dto'

describe('BookItemComponent', () => {
  let component: BookItemComponent
  let fixture: ComponentFixture<BookItemComponent>
  let router: Router

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Import RouterTestingModule for testing
      declarations: [BookItemComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BookItemComponent)
    component = fixture.componentInstance

    // Provide a value for the bookItem input
    component.bookItem = {
      isbn: '9781449331818',
    } as BookDto

    router = TestBed.inject(Router)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should navigate to the book details  when button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate')

    const button = fixture.debugElement.query(By.css('#bookDetails'))
    button.nativeElement.click()

    expect(navigateSpy).toHaveBeenCalledWith([
      '/home/category',
      component.bookItem.isbn,
    ])
  })
})
