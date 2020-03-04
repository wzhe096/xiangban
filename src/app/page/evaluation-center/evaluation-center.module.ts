import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluationCenterPageRoutingModule } from './evaluation-center-routing.module';

import { EvaluationCenterPage } from './evaluation-center.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluationCenterPageRoutingModule
  ],
  declarations: [EvaluationCenterPage]
})
export class EvaluationCenterPageModule {}
