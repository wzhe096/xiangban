import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDynamicPage } from './my-dynamic.page';

const routes: Routes = [
  {
    path: '',
    component: MyDynamicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDynamicPageRoutingModule {}
