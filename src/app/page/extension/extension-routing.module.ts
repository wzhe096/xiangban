import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtensionPage } from './extension.page';

const routes: Routes = [
  {
    path: '',
    component: ExtensionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtensionPageRoutingModule {}
