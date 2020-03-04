import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBankCard2Page } from './add-bank-card2.page';

const routes: Routes = [
  {
    path: '',
    component: AddBankCard2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBankCard2PageRoutingModule {}
