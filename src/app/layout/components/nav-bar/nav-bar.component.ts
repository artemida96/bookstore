import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col overflow-hidden',
  },
})
export class NavBarComponent {}
