import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemoPageRoutingModule } from './demo-routing.module';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


import { DemoPage } from './demo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoPageRoutingModule
  ],
  declarations: [DemoPage],
  providers: [Camera]
})
export class DemoPageModule {}
