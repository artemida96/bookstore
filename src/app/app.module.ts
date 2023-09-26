import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { LayoutModule } from './layout/layout.module'
import { BooksModule } from './books/books.module'
import { RouterModule } from '@angular/router'
import { LayoutComponent } from './layout/layout.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{ path: '', component: LayoutComponent }]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    LayoutModule,
    BooksModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
