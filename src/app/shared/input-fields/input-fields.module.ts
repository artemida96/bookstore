import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputFieldsComponent } from './input-fields.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [InputFieldsComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputFieldsComponent],
})
export class InputFieldsModule {}
