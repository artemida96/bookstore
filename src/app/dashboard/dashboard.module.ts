import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard.component'
import { RouterModule } from '@angular/router'
import { BooksModule } from '../books/books.module'

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    BooksModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent,
      },
    ]),
  ],
})
export class DashboardModule {}
