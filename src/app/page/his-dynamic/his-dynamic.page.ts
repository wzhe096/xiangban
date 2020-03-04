import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-his-dynamic',
  templateUrl: './his-dynamic.page.html',
  styleUrls: ['./his-dynamic.page.scss'],
})
export class HisDynamicPage implements OnInit {
  reportSuccessShow=false;
  dynamics = [];
  public showList;
  constructor(public toastController: ToastController,public alertController: AlertController) {
    this.showList=false;
   }

  ngOnInit() {
    this.queryDynamic();
  }
  backdropclick(event){

  }
  /**
   * 消息提示
   * @param msg
   */
  async reported(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color:'dark',
      position:'middle',
      cssClass:'toast' //只能在theme/variables.css或者global.scss进行修饰
    });
    toast.present();
  }
  presentPopover() {
    if ( this.showList == true ) {
       return  this.showList=false;
    }else{
       return  this.showList=true;
    }
  }
  /**
   * 拉黑
   */
  async block() {
    const alert = await this.alertController.create({
      header: '',
      message: '拉黑后将不会再收到对方消息，可在消息页面“黑名单”中解除。是否拉黑？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            this.reported('已拉黑');
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * 查询个人动态
   */
  queryDynamic() {
    const dynamic1 = {
      nickName: '流水',
      sex: '1',
      age: '23',
      profession: 'it民工',
      note: 'hello',
      photos: ['assets\\img\\dynamic1.png', 'assets\\img\\dynamic2.png'],
      numberLikes: 4200
    };
    const dynamic2 = {
      nickName: '流水',
      sex: '0',
      age: '23',
      profession: 'it民工',
      note: 'hello',
      photos: ['assets\\img\\dynamic1.png', 'assets\\img\\dynamic2.png', 'assets\\img\\dynamic3.png'],
      numberLikes: 4200
    };
    this.dynamics.push(dynamic1);
    this.dynamics.push(dynamic2);
  }
  toChat(){
    this.reportSuccessShow=true;
  }
  closeChat(){
    this.reportSuccessShow=false;
  }
}
