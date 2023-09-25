import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { BookDto } from '../../books/dto/book.dto'
import { Router } from '@angular/router'

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow overflow-hidden ',
  },
})
export class BookItemComponent {
  @Input() bookItem!: BookDto
  rating = Array.from({ length: 5 }, (_, index) => index + 1)

  constructor(private router: Router) {}

  goToBookDetails(isbn: string) {
    this.router.navigate(['/home/category', isbn])
  }
}
