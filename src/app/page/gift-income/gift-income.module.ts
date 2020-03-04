import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiftIncomePageRoutingModule } from './gift-income-routing.module';

import { GiftIncomePage } from './gift-income.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiftIncomePageRoutingModule
  ],
  declarations: [GiftIncomePage]
})
export class GiftIncomePageModule {}
