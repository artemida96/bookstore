import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DateYearPipe } from './date-year.pipe'

@NgModule({
  declarations: [DateYearPipe],
  exports: [DateYearPipe],
  imports: [CommonModule],
})
export class CustomPipesModule {}
