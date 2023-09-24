import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow overflow-hidden  ',
  },
})
export class BookFormComponent {
  @Input() bookForm: FormGroup = this.fb.group({
    options: [''],
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
      [Validators.required, Validators.minLength(5), Validators.maxLength(60)],
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
    rating: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
        Validators.pattern(/^\d{1}$/),
        Validators.pattern('^[1-5]*$'),
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

  constructor(private fb: FormBuilder) {}
}
