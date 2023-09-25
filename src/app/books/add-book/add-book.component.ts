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
  formFields = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      validationMessage: 'Please enter a valid title (10-120 characters).',
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(120),
        Validators.pattern(/[@'#&*!a-zA-Z0-9\s]+/),
      ],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      validationMessage:
        'Please enter a valid description (max 512 characters).',
      validators: [
        Validators.required,
        Validators.maxLength(512),
        Validators.pattern(/[A-Z].*/),
      ],
    },
    {
      name: 'categories',
      label: 'Categories',
      type: 'text',
      validationMessage: 'Please enter valid categories (comma-separated).',
      validators: [
        Validators.required,
        Validators.pattern(/[^,]+(,[^,]+){0,3}/),
      ],
    },
    {
      name: 'author',
      label: 'Author Name',
      type: 'text',
      validationMessage:
        'Please enter valid author names (comma-separated, max 3 authors).',
      validators: [
        Validators.required,
        Validators.pattern(/[^,]+(,[^,]+){0,2}/),
      ],
    },
    {
      name: 'publisher',
      label: 'Publisher',
      type: 'text',
      validationMessage:
        'Please enter a valid publisher (min 5, max 60 characters).',
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60),
      ],
    },
    {
      name: 'published',
      label: 'Year',
      type: 'text',
      validationMessage: 'Please enter a valid year (4 digits).',
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern(/^\d{4}$/),
      ],
    },
    {
      name: 'pages',
      label: 'Page Numbers',
      type: 'text',
      validationMessage: 'Please enter a valid number of pages (max 9999).',
      validators: [
        Validators.required,
        Validators.max(9999),
        Validators.pattern('^[0-9]*$'),
      ],
    },
    {
      name: 'options',
      label: 'Options',
      type: 'text',
      validationMessage: 'Please enter valid options.',
      validators: [Validators.required],
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'text',
      validationMessage: 'Please enter a valid rating from 1 to 5.',
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
        Validators.pattern('^[1-5]*$'),
      ],
    },
    {
      name: 'isbn10',
      label: 'ISBN-10',
      type: 'text',
      validationMessage: 'Please enter a valid ISBN-10 (10 digits).',
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d{10}$/),
        Validators.pattern('^[0-9]*$'),
      ],
    },
    {
      name: 'isbn13',
      label: 'ISBN-13',
      type: 'text',
      validationMessage: 'Please enter a valid ISBN-13 (13 digits).',
      validators: [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern(/^\d{13}$/),
        Validators.pattern('^[0-9]*$'),
      ],
    },
  ]

  bookFormArray: FormArray
  bookForm: FormGroup
  booksSaved = false

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.bookForm = this.fb.group({})
    this.bookFormArray = this.fb.array([])
    this.addNewBook()
  }

  createFormGroup(): FormGroup {
    const formGroup = this.fb.group({})
    this.formFields.forEach((field) => {
      formGroup.addControl(field.name, this.fb.control('', field.validators))
    })
    return formGroup
  }

  addNewBook() {
    this.bookFormArray.push(this.createFormGroup())
    console.log(this.bookFormArray)
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
    return this.bookFormArray.controls.some((control) => control.invalid)
  }
}
