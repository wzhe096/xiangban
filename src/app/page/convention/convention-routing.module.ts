import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConventionPage } from './convention.page';

const routes: Routes = [
  {
    path: '',
    component: ConventionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConventionPageRoutingModule {}
