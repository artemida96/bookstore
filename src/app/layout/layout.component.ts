import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-grow overflow-hidden',
  },
})
export class LayoutComponent {}
