import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BooksComponent } from './books.component'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { BooksEffects } from './effects/books.effects'
import { booksReducer } from './reducers/books.reducers'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BooksComponent },
]

@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('books', booksReducer),
    EffectsModule.forFeature([BooksEffects]),
  ],
})
export class BooksModule {}
