import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, shareReplay } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class IconsCacheService {
  private iconsMap = new Map<string, Observable<string>>()

  constructor(private httpClient: HttpClient) {}

  loadIcon(iconName: string) {
    const cachedIcon = this.iconsMap.get(iconName)

    if (cachedIcon) {
      return cachedIcon
    }

    const iconRequest = this.httpClient
      .get(`../assets/${iconName}.svg`, {
        responseType: 'text',
      })
      .pipe(shareReplay(1))

    this.iconsMap.set(iconName, iconRequest)

    return iconRequest
  }
}
