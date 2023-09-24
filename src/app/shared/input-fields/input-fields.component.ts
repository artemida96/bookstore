import { Component, Input, forwardRef } from '@angular/core'
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'

@Component({
  selector: 'app-input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldsComponent),
      multi: true,
    },
  ],
})
export class InputFieldsComponent implements ControlValueAccessor {
  @Input() label?: string
  @Input() controlName!: string | number | null
  @Input() inputType?: string
  @Input() inputId?: string
  @Input() placeholder?: string
  @Input() invalid?: boolean
  @Input() errorMessage?: string
  @Input() formControl?: FormControl
  @Input() form?: any

  value?: string

  onChange: (value: string) => void = () => {}
  onTouched: () => void = () => {}

  writeValue(value: string): void {
    this.value = value
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

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
