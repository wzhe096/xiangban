import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenMembershipPageRoutingModule } from './open-membership-routing.module';

import { OpenMembershipPage } from './open-membership.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenMembershipPageRoutingModule
  ],
  declarations: [OpenMembershipPage]
})
export class OpenMembershipPageModule {}
