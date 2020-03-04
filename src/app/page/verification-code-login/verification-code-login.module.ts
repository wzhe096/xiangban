import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationCodeLoginPageRoutingModule } from './verification-code-login-routing.module';

import { VerificationCodeLoginPage } from './verification-code-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationCodeLoginPageRoutingModule
  ],
  declarations: [VerificationCodeLoginPage]
})
export class VerificationCodeLoginPageModule {}
