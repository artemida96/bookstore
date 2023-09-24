import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { CreateBookDto } from '../dto/create-book.dto'
import { addBooks } from '../actions/books.actions'
import { Store } from '@ngrx/store'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow overflow-hidden mt-4 p-6 ',
  },
})
export class AddBookComponent {
  bookFormArray: FormArray
  booksSaved = false
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.bookFormArray = this.fb.array([])
    this.addNewBook()
  }

  addNewBook() {
    const bookFormGroup: FormGroup = this.fb.group({
      options: [''],
      rating: [''],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(120),
          Validators.pattern(/[@'#&*!a-zA-Z0-9\s]+/),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(512),
          Validators.pattern(/[A-Z].*/),
        ],
      ],
      categories: [
        '',
        [Validators.required, Validators.pattern(/[^,]+(,[^,]+){0,3}/)],
      ],
      author: [
        '',
        [Validators.required, Validators.pattern(/[^,]+(,[^,]+){0,2}/)],
      ],
      publisher: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
        ],
      ],
      published: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern(/^\d{4}$/),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      pages: [
        '',
        [
          Validators.required,
          Validators.max(9999),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      isbn10: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^\d{10}$/),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      isbn13: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
          Validators.pattern(/^\d{13}$/),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    })
    this.bookFormArray.push(bookFormGroup)
  }

  /*if we had b/e make endpoint and add book, implement effect + reducer*/
  save() {
    const books: CreateBookDto[] = this.bookFormArray.controls.map(
      (control) => control.value
    )
    this.store.dispatch(addBooks({ books }))
    this.booksSaved = true
    setTimeout(() => {
      this.router.navigate(['/home'])
    }, 1000)
  }

  removeBook(index: number) {
    this.bookFormArray.removeAt(index)
  }

  isAnyFormGroupInvalid(): boolean {
    for (let i = 0; i < this.bookFormArray.controls.length; i++) {
      const bookFormGroup = this.bookFormArray.at(i) as FormGroup
      if (bookFormGroup.invalid) {
        return true
      }
    }
    return false
  }
}
