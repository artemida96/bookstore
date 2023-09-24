import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { loadBooks } from './books/actions/books.actions'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow h-full overflow-hidden',
  },
})
export class AppComponent {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadBooks())
  }
}
