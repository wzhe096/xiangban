import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemSetupPage } from './system-setup.page';

const routes: Routes = [
  {
    path: '',
    component: SystemSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemSetupPageRoutingModule {}
