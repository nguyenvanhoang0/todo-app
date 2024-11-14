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
        path: 'update-me',
        loadChildren: () =>
          import('./modules/update-profile/update-profile.module').then((module) => module.UpdateProfileModule),
      },
      {
        path: 'todo',
        loadChildren: () =>
          import('./modules/todo/todo.module').then((module) => module.TodoModule),
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
