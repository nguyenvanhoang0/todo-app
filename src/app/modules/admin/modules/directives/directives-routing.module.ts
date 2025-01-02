import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonDirectiveComponent } from './componnents/button-directive/button-directive.component';
import { DirectivesComponent } from './directives.component';

const routes: Routes = [
  {
    path: '',
    component: DirectivesComponent,
  },
  {
    path: 'button-directive',
    component: ButtonDirectiveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectivesRoutingModule {}
