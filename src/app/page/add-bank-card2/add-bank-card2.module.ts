import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBankCard2PageRoutingModule } from './add-bank-card2-routing.module';

import { AddBankCard2Page } from './add-bank-card2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBankCard2PageRoutingModule
  ],
  declarations: [AddBankCard2Page]
})
export class AddBankCard2PageModule {}
