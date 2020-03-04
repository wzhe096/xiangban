import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlidPageRoutingModule } from './slid-routing.module';

import { SlidPage } from './slid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlidPageRoutingModule
  ],
  declarations: [SlidPage]
})
export class SlidPageModule {}
