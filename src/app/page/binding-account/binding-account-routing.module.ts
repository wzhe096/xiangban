import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BindingAccountPage } from './binding-account.page';

const routes: Routes = [
  {
    path: '',
    component: BindingAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BindingAccountPageRoutingModule {}
