import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { BookDto } from '../dto/book.dto'
import { CreateBookDto } from '../dto/create-book.dto'

@Injectable({
  providedIn: 'root',
})
export class BooksApiService {
  private baseUrl = 'assets/data/books.json'

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<{ books: BookDto[] }> {
    return this.http.get<{ books: BookDto[] }>(this.baseUrl)
  }
}
