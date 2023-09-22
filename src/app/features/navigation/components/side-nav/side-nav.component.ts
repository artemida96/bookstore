import { Component } from '@angular/core'
import { Section } from '../../types/section.type'

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  sections: Section[] = [
    { name: 'Dashboard', sublinks: [], isOpen: false },
    {
      name: 'Book Categories',
      sublinks: ['Drama', 'Horror', 'Mystery', 'Travel', 'Jurnal', 'Science'],
      isOpen: false,
    },
    {
      name: 'Manage Books',
      sublinks: ['Book List', 'Add books'],
      isOpen: false,
    },
  ]

  toggleSection(section: Section): void {
    section.isOpen = !section.isOpen
  }
}
