import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'dateYear',
})
export class DateYearPipe implements PipeTransform {
  transform(date: string): string {
    if (!date) return ''

    const year = new Date(date).getFullYear()
    return year.toString()
  }
}
