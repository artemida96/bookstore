/* Implemented a reusable input function to streamline input
 collection and eliminate redundant code */
import { Component, Input, forwardRef } from '@angular/core'
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms'

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label?: string
  @Input() formControlName?: string
  @Input() placeholder?: string
  @Input() formControl?: FormControl
  @Input() validationMessage?: string
  @Input() type?: string

  value?: string | number

  onChange: any = () => {}
  onTouched: any = () => {}

  isFieldFocused = false

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  onInputChange(event: Event): void {
    this.value = (event.target as HTMLInputElement).value
    const inputValue = (event.target as HTMLInputElement).value
    const parsedValue = parseFloat(inputValue)

    if (!isNaN(parsedValue) && this.type === 'number') {
      this.value = parsedValue
    } else {
      this.value = inputValue
    }

    this.onChange(this.value)
    this.onTouched()
  }

  onFieldFocus() {
    this.isFieldFocused = true
  }
}
