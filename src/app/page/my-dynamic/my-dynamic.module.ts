import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyDynamicPageRoutingModule } from './my-dynamic-routing.module';

import { MyDynamicPage } from './my-dynamic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyDynamicPageRoutingModule
  ],
  declarations: [MyDynamicPage]
})
export class MyDynamicPageModule {}
