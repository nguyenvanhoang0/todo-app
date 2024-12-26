import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsCoreComponent } from './components-core.component';
import { ButtonVariantsComponent } from './components/button-variants/button-variants.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentsCoreComponent,
  },
  {
    path: 'button-variants',
    component: ButtonVariantsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsCoreRoutingModule {}
