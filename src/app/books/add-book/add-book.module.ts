import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AddBookComponent } from './add-book.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { BookFormComponent } from './book-form/book-form.component'

@NgModule({
  declarations: [AddBookComponent, BookFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AddBookComponent },
    ]),
  ],
})
export class AddBookModule {}
