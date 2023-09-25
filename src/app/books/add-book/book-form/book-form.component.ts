import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms'
import { FormFieldConfig } from 'src/app/shared/form/types/form-field-config.type'

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
  @Input() formFields!: FormFieldConfig[]
  @Input() bookForm!: FormGroup

  constructor() {}
}
