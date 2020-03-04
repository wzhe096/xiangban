import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerservicePageRoutingModule } from './customerservice-routing.module';

import { CustomerservicePage } from './customerservice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerservicePageRoutingModule
  ],
  declarations: [CustomerservicePage]
 
})
export class CustomerservicePageModule {}
