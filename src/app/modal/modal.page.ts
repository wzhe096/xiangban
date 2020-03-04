import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';//导入modal
import {LoginComponent} from './components/login/login.component';//导入弹出页面组件


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
public aid='111';
  constructor(public modalController: ModalController) {

  }
  ngOnInit() {
  }

  async showLogin() {
    const modal = await this.modalController.create({
      component: LoginComponent,
      componentProps:{aid:123}
    });
    return await modal.present();
  }
}
