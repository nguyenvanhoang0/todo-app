import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'me',
        loadChildren: () =>
          import('./modules/profile/profile.module').then((module) => module.ProfileModule),
      },
      {
        path: '**',
        pathMatch: 'prefix',
        redirectTo: 'me'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
