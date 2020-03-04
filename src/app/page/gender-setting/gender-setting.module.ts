import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenderSettingPageRoutingModule } from './gender-setting-routing.module';

import { GenderSettingPage } from './gender-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenderSettingPageRoutingModule
  ],
  declarations: [GenderSettingPage]
})
export class GenderSettingPageModule {}
