import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetPayPwd2Page } from './forget-pay-pwd2.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetPayPwd2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetPayPwd2PageRoutingModule {}
