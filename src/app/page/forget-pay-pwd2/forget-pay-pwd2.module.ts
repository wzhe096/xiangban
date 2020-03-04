import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetPayPwd2PageRoutingModule } from './forget-pay-pwd2-routing.module';

import { ForgetPayPwd2Page } from './forget-pay-pwd2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgetPayPwd2PageRoutingModule
  ],
  declarations: [ForgetPayPwd2Page]
})
export class ForgetPayPwd2PageModule {}
