import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BindingAccountPageRoutingModule } from './binding-account-routing.module';

import { BindingAccountPage } from './binding-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BindingAccountPageRoutingModule
  ],
  declarations: [BindingAccountPage]
})
export class BindingAccountPageModule {}
