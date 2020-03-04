import { Component, OnInit } from '@angular/core';
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";
import {
  ActionSheetController,
  AlertController,
  Events,
  ModalController,
  NavController,
  PopoverController
} from "@ionic/angular";
import {RongCloudService} from "../../service/rong-cloud.service";
import {StorageService} from "../../service/storage.service";
import {ToolService} from "../../service/tool.service";
import {ActivatedRoute, Router} from "@angular/router";
import {File} from "@ionic-native/file/ngx";
import {Media} from "@ionic-native/media/ngx";
import {Base64} from "@ionic-native/base64/ngx";
import {HttpRequestService} from "../../service/http-request.service";
import {RequestUrlService} from "../../service/request-url.service";

@Component({
  selector: 'app-release-dynamic',
  templateUrl: './release-dynamic.page.html',
  styleUrls: ['./release-dynamic.page.scss'],
})
export class ReleaseDynamicPage implements OnInit {
  dynamic = {
    msgContent: '',
    forbiddenComments: '',
    openLocation: '',
    privacy: '0',
  };
  forbiddenComments: false;
  openLocation: false;
  imgList = [];
  man = false;
  woman = false;
  all = false;
  constructor(public alertController: AlertController,
              public rongcloud: RongCloudService,
              private storageService: StorageService,
              private modalController: ModalController,
              private actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private tool: ToolService,
              public router: Router,
              public events: Events,
              public file: File,
              public media: Media,
              public httpServer: HttpRequestService,
              public requestUrl: RequestUrlService) { }

  ngOnInit() {
  }
  releaseDynamic() {
    this.dynamic.forbiddenComments = this.openLocation ? '1' : '0';
    this.dynamic.openLocation = this.openLocation ? '1' : '0';
    if (this.man) {
      this.dynamic.privacy = '1';
    }
    if (this.woman) {
      this.dynamic.privacy = '2';
    }
    this.httpServer.request({
      method: 'post',
      url: this.requestUrl.messageVerificationUrl,
      data: this.dynamic
    }).then(response => {
    }).catch(result => {
    });
  }
  async uploadImg() {

    const actionSheet = await this.actionSheetCtrl.create({
      // title: 'Modify your album',
      mode: 'ios',
      buttons: [
        {
          text: '相机',
          role: 'boy',
          handler: () => {
            console.log('Destructive clicked');
            const options: CameraOptions = {
              targetWidth: 900,
              targetHeight: 900
            };
            this.tool.getPictureByCamera(options).then(imageBase64 => {
              this.httpServer.request({
                method: 'POST',
                url: this.requestUrl.uploadbase64ImgUrl,
                data: {
                  baseStr: imageBase64,
                  random: '1'
                },
              }).then(result => {
                if (result.status === 0) {
                  const imageUri = this.requestUrl.imageBaseUrl + result.data;
                  this.imgList.push(imageUri);
                } else {
                  this.tool.showToast('上传失败');
                }
              }).catch(result => {

              });
            });
          }
        }, {
          text: '图库',
          role: 'girl',
          handler: () => {
            const options: CameraOptions = {
              targetWidth: 900,
              targetHeight: 900
            };
            this.tool.getPictureByPhotoLibrary(options).then(imageBase64 => {
              this.httpServer.request({
                method: 'POST',
                url: this.requestUrl.uploadbase64ImgUrl,
                data: {
                  baseStr: imageBase64,
                  random: '1'
                },
              }).then(result => {
                if (result.status === 0) {
                  const imageUri = this.requestUrl.imageBaseUrl + result.data;
                  this.imgList.push(imageUri);
                } else {
                  this.tool.showToast('上传失败');
                }
              }).catch(result => {

              });
            });
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
}
