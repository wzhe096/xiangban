import { Injectable } from '@angular/core';
import { AlertController, ToastController, Events, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private loading;
  private toast;
  constructor(public http: HttpClient,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public events: Events,
    private camera: Camera
  ) {
  }
  /**
    * 统一调用此方法显示loading
    * @param content 显示的内容
    */

  async showLoading(content: any) {
    this.loading = await this.loadingCtrl.create({
      message: content,
      // backdropDismiss:true,
      duration: 60000
    });
    await this.loading.present();
  }

  /**
   * 关闭loading
   */
  async hideLoading() {
    await setTimeout(() => {
      this.loading.dismiss()
    }, 500);

  }
  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  async showToast(message: any) {
    if (message) {
      const toast = await this.toastCtrl.create({
        message: message,
        cssClass:"",
        duration: 2000,
      });
      toast.present();
    }
  }

  // 取出url的值
  getUrlParam = function (url, name) {
    var url_param = url.substring(url.indexOf("?") + 1);
    var params = url_param.split("&");
    var value = "";
    params.forEach(element => {
      var ps = element.split("=");
      if (ps[0] == name) {
        value = ps[1];
        return;
      }
    })
    return value;
  }
  /**
   * 关闭信息提示框
   */
  hideToast() {
    this.toast.dismissAll();
  }
  /**
   * 使用cordova-plugin-camera获取照片
   * @param options
   */
  // 弹出提示框
  async showAlert(title, message) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: message,
      buttons: ["确定"],
    });
    alert.present();
  }
  /**
   * 使用cordova-plugin-camera获取照片的base64
   * @param options
   * @return {Promise<T>}
   */
  getPicture = options => {
    return new Promise((resolve, reject) => {
      this.camera
        .getPicture(
          Object.assign(
            {
              destinationType: this.camera.DestinationType.DATA_URL, //返回值格式,DATA_URL:base64,FILE_URI:图片路径
              quality: 100, //保存的图像质量，范围为0 - 100
              // allowEdit: true, //选择图片前是否允许编辑
              encodingType: this.camera.EncodingType.JPEG,
              // targetWidth: 900, //缩放图像的宽度（像素）
              // targetHeight: 900, //缩放图像的高度（像素）
              saveToPhotoAlbum: false, //是否保存到相册
              correctOrientation: true, //设置摄像机拍摄的图像是否为正确的方向
              mediaType: this.camera.MediaType.PICTURE
            },
            options
          )
        )
        .then(
          imageData => {
            resolve(imageData);
          },
          err => {
            console.log(err);
            err == 20 ? this.showToast("没有打开手机权限") : reject(err);
          }
        );
    });
  };

  /**
   * 通过图库获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByPhotoLibrary = (options = {}) => {
    return new Promise(resolve => {
      this.getPicture(
        Object.assign(
          {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
          },
          options
        )
      )
        .then(imageBase64 => {
          console.log("相册返回数据：" + imageBase64)
          resolve(imageBase64);
        })
        .catch(err => {
          String(err).indexOf("cancel") != -1
            ? console.log("取消选择图片")
            : console.log("获取失败");
        });
    });
  };

  /**
   * 通过拍照获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByCamera = (options = {}) => {
    return new Promise(resolve => {
      this.getPicture(
        Object.assign(
          {
            sourceType: this.camera.PictureSourceType.CAMERA
          },
          options
        )
      )
        .then(imageBase64 => {
          console.log("相机返回数据：" + imageBase64)
          resolve(imageBase64);
        })
        .catch(err => {
          String(err).indexOf("cancel") != -1
            ? console.log("取消拍照")
            : console.log("获取失败");
        });
    });
  };
}
