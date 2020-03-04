import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReleaseDynamicPageRoutingModule } from './release-dynamic-routing.module';

import { ReleaseDynamicPage } from './release-dynamic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReleaseDynamicPageRoutingModule
  ],
  declarations: [ReleaseDynamicPage]
})
export class ReleaseDynamicPageModule {}
