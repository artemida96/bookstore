import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.css'],
})
export class InputFieldsComponent {
  @Input() label?: string
  @Input() controlName!: string | number | null
  @Input() inputType?: string
  @Input() inputId?: string
  @Input() placeholder?: string
  @Input() invalid?: boolean
  @Input() errorMessage?: string
  @Input() formControl?: FormControl

  onKeyPress(event: KeyboardEvent) {
    if (this.inputType === 'number') {
      const isNumericInput = /^[0-9]*$/.test(event.key)
      if (!isNumericInput) {
        event.preventDefault()
      }
    }
  }

  onInput(event: any) {
    if (this.inputType === 'number' && this.formControl?.value) {
      const value = this.formControl.value.toString()
      if (value.length > 4) {
        this.formControl.setValue(value.slice(0, 4))
      }
    }
  }
}
