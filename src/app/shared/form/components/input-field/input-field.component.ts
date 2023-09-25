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
  @Input() fieldName?: string
  @Input() placeholder?: string
  @Input() formControl?: FormControl
  @Input() validationMessage?: string
  @Input() type?: string

  value: string = ''

  onChange: any = () => {}
  onTouched: any = () => {}

  writeValue(value: any): void {
    this.value = value || ''
    this.onChange(this.value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  onInputChange(event: Event): void {
    this.value = (event.target as HTMLInputElement).value
    this.onChange(this.value)
    this.onTouched()
  }
}
