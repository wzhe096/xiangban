import { Component, OnInit } from '@angular/core';
import sd from 'silly-datetime';
import { PickerController, NavController, ActionSheetController } from '@ionic/angular';
import axios from '../../../plugins/axios';
import { HttpserviceService } from '../../demo/services/httpservice.service'
import { Capability } from 'protractor';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpRequestService } from 'src/app/service/http-request.service';
import { RequestUrlService } from 'src/app/service/request-url.service';
import { ToolService } from 'src/app/service/tool.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Helper } from 'src/app/providers/Helper';
@Component({
  selector: 'app-information-completion',
  templateUrl: './information-completion.page.html',
  styleUrls: ['./information-completion.page.scss'],
})
export class InformationCompletionPage implements OnInit {
  public province: any;
  public city: any;
  public county: any;
  username: any;
  password: any;
  multiColumnOptions = [
    [
      '西安市',
      '渭南市',
      '咸阳市',
      '安康市',
      '汉中市'
    ],
    [
      '雁塔区',
      '临渭区',
      '高新区',
      '碑林区',
      '未央区'
    ]
  ]
  profession = [['信息技术', '金融保险', "商业服务", "工程制造", "交通运输", "文化传媒", "娱乐教育", "公共事业"]]
  money = [['6000以下', '6000~8000', '8000~10000', '10000~15000', "15000~20000", "20000以上"]]
  user = {
    picId: 'assets/icon/favicon.png',
    nickName: '',
    birthDay: '',
    address: '',
    income: '',
    profession: ''
  };
  public datetime = "";
  public year;
  customPickerOptions: any;

  constructor(
    public pickercontroller: PickerController,
    public http: HttpserviceService,
    private router: Router,
    private httpServer: HttpRequestService,
    private requestUrl: RequestUrlService,
    private tool: ToolService,
    private nav: NavController,
    private actionSheetCtrl: ActionSheetController,
    public activated: ActivatedRoute,
    public helper: Helper,
  ) {
    //监听选择的定位
    this.activated.queryParams.subscribe((params: Params) => {

      if (params['username'] && params['username'] != "") {
        this.username = params['username']
      }
      if (params['password'] && params['password'] != "") {
        this.password = params['password']
      }
    })
    // let d = new Date();
    // this.datetime = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate();
    // this.datetime = sd.format(d, 'YYYY-MM-DD')
    // this.user.birthDay = this.datetime;
    // console.log(this.datetime)
    //日期
    this.customPickerOptions = {
      buttons: [{
        text: '取消',
        handler: () => console.log('Clicked Save!')
      }, {
        text: '保存',
        handler: (value) => {
          console.log('Clicked Log. Do not Dismiss.');
          // return false;
          console.log(value);
          this.datetime = sd.format(value, 'YYYY-MM-DD')
          console.log(this.datetime)
          this.user.birthDay = this.datetime;
        }
      }]
    }

  }
  // pickerController = document.querySelector('ion-picker-controller')
  ngOnInit() {
  }

  async  openPicker1(numColumns = 1, numOptions = 5, profession) {
    const picker = await this.pickercontroller.create({
      columns: this.getColumns(numColumns, numOptions, profession),
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
            this.user.profession = value['col-0'].text
          }
        }
      ]
    });
    await picker.present();
  }

  async  openPicker2(numColumns = 1, numOptions = 5, money) {
    const picker = await this.pickercontroller.create({
      columns: this.getColumns(numColumns, numOptions, money),
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
  async  openPicker(numColumns = 1, numOptions = 5, multiColumnOptions) {
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
            this.user.address = value['col-0'].text + value['col-1'].text
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
  //完善资料
  updateUserInfo() {
    if (this.user.picId.startsWith("http") || this.user.picId.startsWith("assets")) {
      this.httpServer.request({
        method: 'POST',
        url: this.requestUrl.perfectInformationUrl,
        data: {
          picId: this.user.picId,
          nickName: this.user.nickName,
          birthDay: this.user.birthDay,
          address: this.user.address,
          income: this.user.income,
          profession: this.user.profession,

        },
      }).then(result => {
        console.log(result);
        let dataInfo = result;
        if (dataInfo.status == 0) {
          this.signIn();
        } else {
          this.tool.showToast(result.message);
        }
      }).catch(result => {
        this.tool.showToast("提交失败");
      });
    } else {
      //上传图片
      this.httpServer.request({
        method: 'POST',
        url: this.requestUrl.uploadbase64ImgUrl,
        data: {
          baseStr: this.user.picId.split(",")[1],
          random: "1"
        },
      }).then(result => {
        console.log(result);
        let dataInfo = result;
        if (dataInfo.status == 0) {
          this.user.picId = this.requestUrl.imageBaseUrl + dataInfo.data;
          this.tool.showLoading('提交中...');
          this.httpServer.request({
            method: 'POST',
            url: this.requestUrl.perfectInformationUrl,
            data: {
              picId: this.user.picId,
              nickName: this.user.nickName,
              birthDay: this.user.birthDay,
              address: this.user.address,
              income: this.user.income,
              profession: this.user.profession,

            },
          }).then(result => {
            this.tool.hideLoading();
            console.log(result);
            let dataInfo = result;
            if (dataInfo.status == 0) {
              this.signIn();
            } else {
              this.tool.showToast(result.message);
            }
          }).catch(result => {
            this.tool.hideLoading();
            this.tool.showToast("提交失败");
          });

        } else {
          this.tool.showToast("上传失败");
        }
      }).catch(result => {
        this.tool.showToast("上传失败");
      });

    }
  }
  signIn() {
    this.tool.showLoading('登录中...');
    this.httpServer.request({
      method: 'post',
      url: this.requestUrl.loginUrl,
      data: this.user,
    }).then(res => {
      this.tool.hideLoading();
      if (res.status === 0) {
        localStorage.setItem('token', res.data);
        this.httpServer.request({
          method: 'get',
          url: this.requestUrl.userInfoUrl + '/' + this.username,
        }).then(response => {
          if (response.status === 0) {
            this.helper.loginSuccessHandle(response.data);
            this.nav.navigateRoot(['/tabs']);
          } else {
            this.tool.showToast(res.message);
          }
        }).catch(result => {
          console.log('获取owner信息错误');
        });
      } else {
        this.tool.showToast(res.message);
      }
    }).catch(result => {
      this.tool.hideLoading();
      this.tool.showToast('登录失败，请稍后重试');
    });
  }
}
