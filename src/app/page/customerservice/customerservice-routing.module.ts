import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerservicePage } from './customerservice.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerservicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerservicePageRoutingModule {}
