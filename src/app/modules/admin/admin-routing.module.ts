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
          import('./modules/profile/profile.module').then(
            (module) => module.ProfileModule
          ),
      },
      {
        path: 'update-me',
        loadChildren: () =>
          import('./modules/update-profile/update-profile.module').then(
            (module) => module.UpdateProfileModule
          ),
      },
      {
        path: 'todo',
        loadChildren: () =>
          import('./modules/todo/todo.module').then(
            (module) => module.TodoModule
          ),
      },
      {
        path: 'todo-details/:id',
        loadChildren: () =>
          import('./modules/todo-details/todo-details.module').then(
            (module) => module.TodoDetailsModule
          ),
      },

      {
        path: 'components',
        loadChildren: () =>
          import('./modules/components-core/components-core.module').then(
            (module) => module.ComponentsCoreModule
          ),
      },
      {
        path: 'directives',
        loadChildren: () =>
          import('./modules/directives/directives.module').then(
            (module) => module.DirectivesModule
          ),
      },
      {
        path: '**',
        pathMatch: 'prefix',
        redirectTo: 'me',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
