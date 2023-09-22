import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './layout.component'
import { TopBarComponent } from './components/top-bar/top-bar.component'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../navigation/navigation.module').then(
            (module) => module.NavigationModule
          ),
      },
      {
        path: '**',
        component: LayoutComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [LayoutComponent, TopBarComponent, NavBarComponent],
})
export class LayoutModule {}
