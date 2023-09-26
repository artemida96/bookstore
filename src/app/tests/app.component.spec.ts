import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { LayoutModule } from '../layout/layout.module'
import { BooksModule } from '../books/books.module'
import { RouterModule } from '@angular/router'
import { LayoutComponent } from '../layout/layout.component'
import { AppComponent } from '../app.component'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot([{ path: '', component: LayoutComponent }]),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        LayoutModule,
        BooksModule,
      ],
      declarations: [AppComponent],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
