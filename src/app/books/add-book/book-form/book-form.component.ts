import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms'

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
  @Input() formFields!: {
    name: string
    label: string
    type: string
    validationMessage: string
    validators: ((
      control: AbstractControl<any, any>
    ) => ValidationErrors | null)[]
  }[]
  @Input() bookForm!: FormGroup

  constructor() {}
}
