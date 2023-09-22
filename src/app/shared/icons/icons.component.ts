import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { EMPTY, Observable, map } from 'rxjs'
import { IconsCacheService } from './services/icon-cache-service.service'

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-block',
  },
})
export class IconsComponent {
  @Input() name = ''

  icon$: Observable<SafeHtml> = EMPTY

  constructor(
    private domSanitizer: DomSanitizer,
    private iconsCacheService: IconsCacheService
  ) {}

  ngOnChanges() {
    if (!this.name) {
      throw new Error('No icon name provided!')
    }

    this.icon$ = this.iconsCacheService
      .loadIcon(this.name)
      .pipe(map((icon) => this.domSanitizer.bypassSecurityTrustHtml(icon)))
  }
}
