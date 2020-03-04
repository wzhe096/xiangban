import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenMembershipPage } from './open-membership.page';

const routes: Routes = [
  {
    path: '',
    component: OpenMembershipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenMembershipPageRoutingModule {}
