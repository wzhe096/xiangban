import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationCompletionPage } from './information-completion.page';

const routes: Routes = [
  {
    path: '',
    component: InformationCompletionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationCompletionPageRoutingModule {}
