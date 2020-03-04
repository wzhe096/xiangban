import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReleaseDynamicPage } from './release-dynamic.page';

const routes: Routes = [
  {
    path: '',
    component: ReleaseDynamicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReleaseDynamicPageRoutingModule {}
