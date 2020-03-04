import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtensionPageRoutingModule } from './extension-routing.module';

import { ExtensionPage } from './extension.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtensionPageRoutingModule
  ],
  declarations: [ExtensionPage]
})
export class ExtensionPageModule {}
