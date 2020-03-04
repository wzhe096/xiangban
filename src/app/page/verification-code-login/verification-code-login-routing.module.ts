import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationCodeLoginPage } from './verification-code-login.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationCodeLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationCodeLoginPageRoutingModule {}
