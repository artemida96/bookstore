import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './layout.component'
import { TopBarComponent } from './components/top-bar/top-bar.component'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (module) => module.DashboardModule
          ),
      },
    ],
  },
  {
    path: '**',
    component: LayoutComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [LayoutComponent, TopBarComponent, NavBarComponent],
})
export class LayoutModule {}
