import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashWithdrawalPage } from './cash-withdrawal.page';

const routes: Routes = [
  {
    path: '',
    component: CashWithdrawalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashWithdrawalPageRoutingModule {}
