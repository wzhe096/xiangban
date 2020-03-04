import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBankCardPage } from './add-bank-card.page';

const routes: Routes = [
  {
    path: '',
    component: AddBankCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBankCardPageRoutingModule {}
