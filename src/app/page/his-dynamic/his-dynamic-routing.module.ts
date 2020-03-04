import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisDynamicPage } from './his-dynamic.page';

const routes: Routes = [
  {
    path: '',
    component: HisDynamicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisDynamicPageRoutingModule {}
