import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlidPage } from './slid.page';

const routes: Routes = [
  {
    path: '',
    component: SlidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlidPageRoutingModule {}
