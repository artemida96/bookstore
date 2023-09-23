import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { EMPTY, Observable, catchError, map } from 'rxjs'
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
export class IconsComponent implements OnChanges {
  @Input() name = ''
  icon$: Observable<SafeHtml> = EMPTY

  constructor(
    private domSanitizer: DomSanitizer,
    private iconsCacheService: IconsCacheService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['name'] || !changes['name'].currentValue) {
      throw new Error('No icon name provided!')
    }

    this.icon$ = this.loadIcon(changes['name'].currentValue)
  }

  private loadIcon(iconName: string): Observable<SafeHtml> {
    return this.iconsCacheService.loadIcon(iconName).pipe(
      catchError(() => {
        return EMPTY
      }),
      map((icon) => this.domSanitizer.bypassSecurityTrustHtml(icon))
    )
  }
}
