import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetPayPwdPageRoutingModule } from './set-pay-pwd-routing.module';

import { SetPayPwdPage } from './set-pay-pwd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetPayPwdPageRoutingModule
  ],
  declarations: [SetPayPwdPage]
})
export class SetPayPwdPageModule {}
