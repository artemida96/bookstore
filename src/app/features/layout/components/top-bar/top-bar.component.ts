import { Component } from '@angular/core'

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  host: {
    class: 'sticky top-0 flex h-20 flex-shrink-0  shadow z-20',
  },
})
export class TopBarComponent {}
