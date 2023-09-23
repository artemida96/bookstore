import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { BookDetailsComponent } from './book-details.component'
import { CustomPipesModule } from 'src/app/shared/pipes/custom-pipes.module'

@NgModule({
  declarations: [BookDetailsComponent],
  imports: [
    CommonModule,
    CustomPipesModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: BookDetailsComponent },
    ]),
  ],
})
export class BookDetailsModule {}