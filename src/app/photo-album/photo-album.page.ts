import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, PickerController, AlertController } from '@ionic/angular';
import { HttpRequestService } from 'src/app/service/http-request.service';
import { RequestUrlService } from 'src/app/service/request-url.service';
import { ToolService } from 'src/app/service/tool.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-photo-album',
  templateUrl: './photo-album.page.html',
  styleUrls: ['./photo-album.page.scss'],
})
export class PhotoAlbumPage implements OnInit {
  uploadimg: any = [];
  uploadvideo: any = "";
  user: any = {};
  constructor(
    private httpServer: HttpRequestService,
    private requestUrl: RequestUrlService,
    private tool: ToolService,
    private router: Router,
    private nav: NavController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController
  ) { }

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
        this.uploadimg = [];
        if (result.data.images && result.data.images.length > 0) {
          result.data.images.forEach(element => {
            var newImageUrl = this.requestUrl.imageBaseUrl + element;
            this.uploadimg.push(newImageUrl);
          });
          console.log(this.uploadimg)
        }
      } else {

      }
    }).catch(result => {
      // this.tool.hideLoading();
      this.tool.showToast('查询失败，请稍后重试');
    });
  }

  //选择图片
  async chooseImg(uploadimg) {
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
              uploadimg.push(imageBase64);
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
              uploadimg.push(imageBase64);
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
  //删除图片
  deleteImg(uploadimg, index) {
    event.stopPropagation();
    console.log("要删除的图片下标：" + index);
    uploadimg.splice(index, 1);
    console.log(uploadimg);
  }
  chooseVideo() {
    const options: CameraOptions = {
      targetWidth: 900,
      targetHeight: 900
    }
    this.tool.getPictureByPhotoLibrary(options).then(videoBase64 => {
      // let base64Image = 'data:image/jpeg;base64,' + videoBase64;
      console.log("选择的视频：" + videoBase64);
      this.uploadvideo = videoBase64;
    });
  }
  //删除图片
  deleteVideo() {
    event.stopPropagation();
    this.uploadvideo = "";
    console.log(this.uploadvideo);
  }
  //上传图片
  async upload(imageInfo) {
    // this.tool.showLoading();
    let uploadImg = [];
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
  //提交
  submit() {
    this.presentAlertConfirm();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '确认提交',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          handler: () => {
            console.log('Confirm Okay');
            this.submitFinall();
          }
        }
      ]
    });
    await alert.present();
  }
  //提交
  async submitFinall() {
    this.tool.showLoading('保存中');
    let images = await this.upload(this.uploadimg)
    console.log("上传的图片", images);
    await this.httpServer.request({
      method: 'post',
      url: this.requestUrl.changeUserInfoUrl,
      data: {
        images: images,
      }
    }).then(result => {
      this.tool.hideLoading();
      if (result.status === 0) {
        // this.nav.navigateBack("personal-data");
        this.nav.pop();
      } else {
        this.tool.showToast(result.message);
      }
    }).catch(result => {
      this.tool.hideLoading();
      this.tool.showToast('保存失败，请稍后重试');
    });
  }

}
