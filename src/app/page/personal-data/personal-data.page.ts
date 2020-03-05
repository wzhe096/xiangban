import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ActionSheetController, PickerController } from '@ionic/angular';
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
  public isShow = false;
  public paySuccessShow = false;
  public reportSuccessShow = true;
  public showList;
  money = [['6000以下', '6000~8000', '8000~10000', '10000~15000', "15000~20000", "20000以上"]]
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    private httpServer: HttpRequestService,
    private requestUrl: RequestUrlService,
    private tool: ToolService,
    private router: Router,
    private nav: NavController,
    private actionSheetCtrl: ActionSheetController,
    private pickercontroller: PickerController) {
    this.showList = false;
  }
  async openPicker(numColumns = 1, numOptions = 5, multiColumnOptions) {
    const picker = await this.pickercontroller.create({
      columns: this.getColumns(numColumns, numOptions, multiColumnOptions),
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确定',
          handler: (value) => {
            console.log(value);
            console.log(value['col-0'].text);
            this.user.income = value['col-0'].text
          }
        }
      ]
    });
    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }
    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      })
    }
    return options;
  }
  ngOnInit() {
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
  async submit() {
    this.tool.showLoading('保存中');
    if (this.user.picId != "") {
      this.user.picId = await this.upload(this.user.picId);
    } else {
      this.user.picId = "";
    }
    await this.httpServer.request({
      method: 'post',
      url: this.requestUrl.changeUserInfoUrl,
      data: {
        address: this.user.address,
        age: this.user.age,
        income: this.user.income,
        mobile: this.user.mobile,
        nickName: this.user.nickName,
        picId: this.user.picId,
      }
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
  //上传图片
  async upload(imageInfo) {
    // this.tool.showLoading();
    let uploadImg = "";
    if (imageInfo.length > 0) {
      await this.httpServer.request({
        method: 'POST',
        url: this.requestUrl.uploadbase64ImgLsitUrl,
        data: {
          baseStr: imageInfo
        },
      }).then(result => {
        let uploadInfo = result.data;
        if (result.status == "0") {
          uploadImg = uploadInfo;
          console.log(uploadImg);
        } else {
          this.tool.showToast(result.message);
          // this.tool.hideLoading();
        }
      }).catch(result => {
        //this.tool.showToast(result);
        // this.tool.hideLoading();
      });
    }
    return uploadImg;
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
  //跳转到相册
  jumpPhotoAlbum() {
    this.router.navigate(["/photo-album"]);
  }

}
