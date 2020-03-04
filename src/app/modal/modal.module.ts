import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPageRoutingModule } from './modal-routing.module';

import { ModalPage } from './modal.page';
import {LoginComponent} from './components/login/login.component';//导入弹出页面组件

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageRoutingModule
  ],
  declarations: [ModalPage,LoginComponent], //声明导入弹出页面组件
  entryComponents:[LoginComponent] //二次声明导入弹出页面组件
})
export class ModalPageModule {}
