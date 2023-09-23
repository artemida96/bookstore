import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AddBookComponent } from './add-book.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { InputFieldsModule } from 'src/app/shared/input-fields/input-fields.module'

@NgModule({
  declarations: [AddBookComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputFieldsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AddBookComponent },
    ]),
  ],
})
export class AddBookModule {}
