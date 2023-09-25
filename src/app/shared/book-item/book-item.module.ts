import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BookItemComponent } from './book-item.component'
import { IconsModule } from '../icons/icons.module'

@NgModule({
  declarations: [BookItemComponent],
  imports: [CommonModule, IconsModule],
  exports: [BookItemComponent],
})
export class BookItemModule {}
