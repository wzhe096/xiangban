import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.page.html',
  styleUrls: ['./personal-data.page.scss'],
})
export class PersonalDataPage implements OnInit {

  user = {
    userName: '',
    nickName: '',
    mobile: '',
    level: '',
    sex: '',
    age: '',
    city: '',
    profession: '',
    income: '',
    photos: []
  };
  peapleInfo = {
    distance: '0.23km',
    age: '23',
    gender: '女',
    job: '学生'

  };
  public isShow = false;
  public paySuccessShow = false;

  public reportSuccessShow = true;
  public showList;
  constructor(public alertController: AlertController, public toastController: ToastController) {
    this.showList = false;
  }

  ngOnInit() {
    this.queryUserByUserName();
  }

  queryUserByUserName() {
    const user = {
      userName: '15332217572',
      nickName: '流水',
      mobile: '15332217572',
      level: '4',
      sex: '1',
      age: '23',
      city: '西安',
      profession: 'it民工',
      income: '1800',
      photos: ['assets\\img\\1.jpg', 'assets\\img\\1.jpg', 'assets\\img\\3.jpg']
    };
    this.user = user;
  }

  presentPopover() {
    if (this.showList == true) {
      return this.showList = false;
    } else {
      return this.showList = true;
    }
  }

  /**
   * 消息提示
   * @param msg
   */
  async reported(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'dark',
      position: 'middle',
      cssClass: 'toast' //只能在theme/variables.css或者global.scss进行修饰
    });
    toast.present();
  }
  onClick() {

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
  showAppearance() {
    this.isShow = true;
  }
  backdropclick(event) {

  }

}
