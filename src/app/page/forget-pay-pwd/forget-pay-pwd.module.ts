import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetPayPwdPageRoutingModule } from './forget-pay-pwd-routing.module';

import { ForgetPayPwdPage } from './forget-pay-pwd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgetPayPwdPageRoutingModule
  ],
  declarations: [ForgetPayPwdPage]
})
export class ForgetPayPwdPageModule {}
