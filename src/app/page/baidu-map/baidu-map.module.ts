import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaiduMapPageRoutingModule } from './baidu-map-routing.module';

import { BaiduMapPage } from './baidu-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaiduMapPageRoutingModule
  ],
  declarations: [BaiduMapPage]
})
export class BaiduMapPageModule {}
