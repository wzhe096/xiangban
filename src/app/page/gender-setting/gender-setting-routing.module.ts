import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenderSettingPage } from './gender-setting.page';

const routes: Routes = [
  {
    path: '',
    component: GenderSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenderSettingPageRoutingModule {}
