import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BooksComponent } from './books.component'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { BooksEffects } from './effects/books.effects'
import { booksReducer } from './reducers/books.reducers'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BooksComponent,
  },
  {
    path: 'category/:isbn',
    loadChildren: () =>
      import('./book-details/book-details.module').then(
        (m) => m.BookDetailsModule
      ),
  },
]

@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('books', booksReducer),
    EffectsModule.forFeature([BooksEffects]),
  ],
  exports: [BooksComponent],
})
export class BooksModule {}
