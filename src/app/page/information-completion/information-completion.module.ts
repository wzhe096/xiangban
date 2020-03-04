import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationCompletionPageRoutingModule } from './information-completion-routing.module';

import { InformationCompletionPage } from './information-completion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationCompletionPageRoutingModule
  ],
  declarations: [InformationCompletionPage]
})
export class InformationCompletionPageModule {}
