import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBankCardPageRoutingModule } from './add-bank-card-routing.module';

import { AddBankCardPage } from './add-bank-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBankCardPageRoutingModule
  ],
  declarations: [AddBankCardPage]
})
export class AddBankCardPageModule {}
