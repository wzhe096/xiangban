import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluationCenterPage } from './evaluation-center.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluationCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationCenterPageRoutingModule {}
