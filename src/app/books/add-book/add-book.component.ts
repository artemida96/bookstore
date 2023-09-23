import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow overflow-hidden',
  },
})
export class AddBookComponent {
  bookForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(120),
        Validators.pattern(/[@'#&*!a-zA-Z0-9\s]+/),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(512),
        Validators.pattern(/[A-Z].*/),
      ]),
      categories: new FormControl('', [
        Validators.required,
        Validators.pattern(/[^,]+(,[^,]+){0,3}/),
      ]),
      authorNames: new FormControl('', [
        Validators.required,
        Validators.pattern(/[^,]+(,[^,]+){0,2}/),
      ]),
      publisher: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60),
      ]),
      year: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern(/^\d{4}$/),
        Validators.pattern('^[0-9]*$'),
      ]),
      pages: new FormControl('', [
        Validators.required,
        Validators.max(9999),
        Validators.pattern('^[0-9]*$'),
      ]),
      isbn10: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d{10}$/),
        Validators.pattern('^[0-9]*$'),
      ]),
      isbn13: new FormControl('', [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern(/^\d{13}$/),
        Validators.pattern('^[0-9]*$'),
      ]),
    })
  }

  onSubmit() {
    if (this.bookForm.valid) {
      // Handle form submission here
      console.log('Form submitted:', this.bookForm.value)
    } else {
      // Display validation errors
      this.validateAllFormFields(this.bookForm)
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field)
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      } else {
        control?.markAsTouched({ onlySelf: true })
      }
    })
  }
}
