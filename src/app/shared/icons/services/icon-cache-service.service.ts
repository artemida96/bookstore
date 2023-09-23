import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, shareReplay } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class IconsCacheService {
  private icons = new Map<string, Observable<string>>()

  constructor(private httpClient: HttpClient) {}

  loadIcon(name: string) {
    const cachedIcon = this.icons.get(name)

    if (cachedIcon) {
      return cachedIcon
    }

    const icon$ = this.httpClient
      .get(`./assets/svg/${name}.svg`, {
        responseType: 'text',
      })
      .pipe(shareReplay(1))

    this.icons.set(name, icon$)

    return icon$
  }
}
