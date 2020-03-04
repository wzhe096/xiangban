import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConventionPageRoutingModule } from './convention-routing.module';

import { ConventionPage } from './convention.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConventionPageRoutingModule
  ],
  declarations: [ConventionPage]
})
export class ConventionPageModule {}
