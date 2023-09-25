import { AbstractControl, ValidationErrors } from '@angular/forms'

export type FormFieldConfig = {
  name: string
  label: string
  type: string
  placeholder?: string
  validationMessage?: string
  validators?: ((
    control: AbstractControl<any, any>
  ) => ValidationErrors | null)[]
}
