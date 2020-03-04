import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SystemSetupPageRoutingModule } from './system-setup-routing.module';

import { SystemSetupPage } from './system-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SystemSetupPageRoutingModule
  ],
  declarations: [SystemSetupPage]
})
export class SystemSetupPageModule {}
