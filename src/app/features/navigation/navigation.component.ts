import { animate, state, style, transition, trigger } from '@angular/animations'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow',
  },
  animations: [
    trigger('sidebarAnimation', [
      state('open', style({ transform: 'translateX(0)' })),
      state('closed', style({ transform: 'translateX(-100%)' })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class NavigationComponent {
  isModalOpen = false

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen
  }
}
