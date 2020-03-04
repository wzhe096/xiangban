import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyIdentityPage } from './verify-identity.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyIdentityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyIdentityPageRoutingModule {}
