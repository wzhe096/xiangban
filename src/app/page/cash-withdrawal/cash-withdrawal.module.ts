import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashWithdrawalPageRoutingModule } from './cash-withdrawal-routing.module';

import { CashWithdrawalPage } from './cash-withdrawal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashWithdrawalPageRoutingModule
  ],
  declarations: [CashWithdrawalPage]
})
export class CashWithdrawalPageModule {}
