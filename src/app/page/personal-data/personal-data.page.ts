import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { HttpRequestService } from 'src/app/service/http-request.service';
import { RequestUrlService } from 'src/app/service/request-url.service';
import { ToolService } from 'src/app/service/tool.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.page.html',
  styleUrls: ['./personal-data.page.scss'],
})
export class PersonalDataPage implements OnInit {

  user: any = {};
  userinfo: any = {
    nickName: "王者1",
    mobile: '18292837296',
    age: 27,
    city: '西安市',
    income: "100000",
    // images: ['assets/img/1.jpg', 'assets/img/1.jpg', 'assets/img/3.jpg']
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
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    private httpServer: HttpRequestService,
    private requestUrl: RequestUrlService,
    private tool: ToolService,
    private router: Router,
    private nav: NavController,
    private actionSheetCtrl: AlertController) {
    this.showList = false;
  }

  ngOnInit() {
    // this.queryUserByUserName();
    this.queryUserInfo();
  }
  //获取个人资料
  queryUserInfo() {
    // this.tool.showLoading('登录中');
    this.httpServer.request({
      method: 'post',
      url: this.requestUrl.queryUserInfoUrl,
      data: {}
    }).then(result => {
      // this.tool.hideLoading();
      if (result.status === 0) {
        this.user = result.data;
      } else {
      }
    }).catch(result => {
      // this.tool.hideLoading();
      this.tool.showToast('查询失败，请稍后重试');
    });
  }
  //保存
  submit() {
    this.tool.showLoading('保存中');
    this.httpServer.request({
      method: 'post',
      url: this.requestUrl.changeUserInfoUrl,
      data: this.userinfo
    }).then(result => {
      this.tool.hideLoading();
      if (result.status === 0) {
        // this.user = result.data;
        this.queryUserInfo();
      } else {
      }
    }).catch(result => {
      this.tool.hideLoading();
      this.tool.showToast('保存失败，请稍后重试');
    });
  }
  //发送图片
  async chooseImg() {
    const actionSheet = await this.actionSheetCtrl.create({
      // title: 'Modify your album',
      mode: "ios",
      buttons: [
        {
          text: "相机",
          role: 'boy',
          handler: () => {
            console.log('Destructive clicked');
            const options: CameraOptions = {
              targetWidth: 900,
              targetHeight: 900
            }
            this.tool.getPictureByCamera(options).then(imageBase64 => {
              console.log("相机返回数据：" + imageBase64)
              let base64Image = 'data:image/jpeg;base64,' + imageBase64;
              console.log("选择的图片：" + base64Image);
              this.user.picId = base64Image;
            });
          }
        }, {
          text: "图库",
          role: 'girl',
          handler: () => {
            const options: CameraOptions = {
              targetWidth: 900,
              targetHeight: 900
            }
            this.tool.getPictureByPhotoLibrary(options).then(imageBase64 => {
              let base64Image = 'data:image/jpeg;base64,' + imageBase64;
              console.log("选择的图片：" + base64Image);
              this.user.picId = base64Image;
              // var imageUri = 'https://www.rongcloud.cn/images/newVersion/log_wx.png';  // 上传到服务器的 url. 用来展示高清图片
            });
          }
        }, {
          text: "取消",
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
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
