import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaiduMapPage } from './baidu-map.page';

const routes: Routes = [
  {
    path: '',
    component: BaiduMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaiduMapPageRoutingModule {}
