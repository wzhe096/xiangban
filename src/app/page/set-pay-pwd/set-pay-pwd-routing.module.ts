import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetPayPwdPage } from './set-pay-pwd.page';

const routes: Routes = [
  {
    path: '',
    component: SetPayPwdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetPayPwdPageRoutingModule {}
