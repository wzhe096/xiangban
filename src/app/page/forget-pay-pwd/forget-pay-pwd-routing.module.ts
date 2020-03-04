import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetPayPwdPage } from './forget-pay-pwd.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetPayPwdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetPayPwdPageRoutingModule {}
