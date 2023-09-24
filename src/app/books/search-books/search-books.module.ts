import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchBooksComponent } from './search-books.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [SearchBooksComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: SearchBooksComponent,
      },
    ]),
  ],
})
export class SearchBooksModule {}
