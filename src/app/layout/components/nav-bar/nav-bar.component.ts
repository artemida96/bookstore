import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col bg-gray-100 overflow-y-auto',
  },
})
export class NavBarComponent {}
