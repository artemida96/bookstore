import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchBooksComponent } from './search-books.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { FormModule } from 'src/app/shared/form/form-module.module'
import { IconsModule } from 'src/app/shared/icons/icons.module'
import { BookItemModule } from 'src/app/shared/book-item/book-item.module'

@NgModule({
  declarations: [SearchBooksComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormModule,
    IconsModule,
    BookItemModule,
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
