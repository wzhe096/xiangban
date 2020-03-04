import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LangsetPage } from './langset.page';

const routes: Routes = [
  {
    path: '',
    component: LangsetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LangsetPageRoutingModule {}
