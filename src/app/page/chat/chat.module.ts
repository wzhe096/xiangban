import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { GiftComponent } from 'src/app/components/gift/gift.component';
import { TitleMeunComponent } from 'src/app/components/title-meun/title-meun.component';
import { TimechangePipe } from 'src/app/pipes/timechange.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
  ],
  declarations: [ChatPage,GiftComponent,TitleMeunComponent,TimechangePipe], 
  entryComponents: [GiftComponent,TitleMeunComponent]
})
export class ChatPageModule {}
