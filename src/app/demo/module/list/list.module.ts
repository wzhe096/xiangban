import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; //自定义模块若想使用ionic内置组件，必须引入ionic模块
import { ListComponent } from './list.component';


@NgModule({
  declarations: [ListComponent], //必须要声明这个组件，否则不成功
  imports: [
    CommonModule,
    IonicModule//自定义模块若想使用ionic内置组件，还必须导入ionic模块
  ],
  exports:[ListComponent]
})
export class ListModule { }
