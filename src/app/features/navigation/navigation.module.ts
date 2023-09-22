import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigationComponent } from './navigation.component'
import { RouterModule } from '@angular/router'
import { IconsModule } from 'src/app/shared/icons/icons.module'
import { SideNavComponent } from './components/side-nav/side-nav.component'

@NgModule({
  declarations: [NavigationComponent, SideNavComponent],
  exports: [NavigationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', outlet: 'nav-bar', component: NavigationComponent },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (module) => module.DashboardModule
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]),
    IconsModule,
  ],
})
export class NavigationModule {}
