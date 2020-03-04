import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisDynamicPageRoutingModule } from './his-dynamic-routing.module';

import { HisDynamicPage } from './his-dynamic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisDynamicPageRoutingModule
  ],
  declarations: [HisDynamicPage]
})
export class HisDynamicPageModule {}
