import { Component } from '@angular/core'
import { Section } from '../../types/section.type'
import { SubSection } from '../../types/sub-section.type'

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  sections: Section[] = [
    { name: 'Dashboard', sublinks: [], isOpen: false, urlLink: '/dashboard' },
    {
      name: 'Manage Books',
      sublinks: [
        { name: 'Book List', urlLink: '/book-list' },
        { name: 'Add books', urlLink: '/add-book' },
      ],
      isOpen: false,
      urlLink: '',
    },
  ]

  toggleSection(section: Section): void {
    section.isOpen = !section.isOpen
  }
}
