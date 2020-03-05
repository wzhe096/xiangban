import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { HttpRequestService } from "../../service/http-request.service";
import { RequestUrlService } from "../../service/request-url.service";
import { StorageService } from "../../service/storage.service";
import { ToolService } from "../../service/tool.service";
import { Helper } from "../../providers/Helper";
import { Storage } from "../../providers/Storage";
import { Events, NavController, PickerController } from "@ionic/angular";

@Component({
  selector: 'app-verification-code-login',
  templateUrl: './verification-code-login.page.html',
  styleUrls: ['./verification-code-login.page.scss'],
})
export class VerificationCodeLoginPage implements OnInit {
  loading = false;
  user = {
    username: '',
    password: ''
  };
  verificationCode = '';
  phonePrefixList = [
    [
      '+86',
      '+25',
      '+30'
    ]
  ];
  phonePrefix = '+86';
  showVerification = true;
  VerificationTime = 60;
  constructor(private router: Router,
    public authService: AuthService,
    public userService: UserService,
    private httpServer: HttpRequestService,
    private requestUrl: RequestUrlService,
    private storageServe: StorageService,
    public events: Events,
    private tool: ToolService,
    public helper: Helper,
    private nav: NavController,
    private pickercontroller: PickerController) { }

  ngOnInit() {
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
          handler: value => {
            // console.log(`Got Value ${value}`);
            console.log(JSON.stringify(value))
            this.phonePrefix = value["col-0"].text;
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
  messageVerification() {
    if (!this.checkUserName()) {
      return;
    }
    this.httpServer.request({
      method: 'get',
      url: this.requestUrl.messageVerificationUrl + '/' + this.user.username,
    }).then(response => {
    }).catch(result => {
    });
    this.showVerification = false;
    const timer = setInterval(() => {
      if (this.VerificationTime > 1) {
        this.VerificationTime--;
      } else {
        this.showVerification = true;
        this.VerificationTime = 60;
        clearInterval(timer);
      }
    }, 1000);
  }
  checkUserName(): boolean {
    if (!this.user.username) {
      this.helper.toast('请输入手机号或邮箱');
      return false;
    }
    if (this.user.username.indexOf('@') > -1) {
      const regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (!regEmail.test(this.user.username)) {
        this.helper.toast('邮箱格式不正确');
        return false;
      }
    } else {
      const lang = Storage.localStorage.get('lang');
      if (lang === 'zh') {
        if (!(/^1[3456789]\d{9}$/.test(this.user.username))) {
          this.helper.toast('请输入正确的手机号');
          return false;
        }
      } else {
        //国外手机号验证
      }
    }
    return true;
  }
  checkVerificationCode(): boolean {
    if (!this.verificationCode) {
      this.helper.toast('请输入验证码');
      return false;
    }
    const regVerificationCode = /^\d{6}$/;
    if (!regVerificationCode.test(this.verificationCode)) {
      this.helper.toast('验证码格式不正确');
      return false;
    }
    return true;
  }
  //验证码登录/注册
  verificationCodeLogin() {
    if (!this.checkUserName()) {
      return;
    }
    if (!this.checkVerificationCode()) {
      return;
    }
    this.tool.showLoading('登录中...');
    this.httpServer.request({
      method: 'post',
      url: this.requestUrl.verificationCodeLoginUrl + '/' + this.verificationCode,
      data: this.user,
    }).then(res => {
      this.tool.hideLoading();
      if (res.status === 0) {
        if (res.data.type) {
          //是注册
          localStorage.setItem('token', res.data.token);
          this.router.navigate(['/information-completion'], {
            queryParams: {
              username: this.user.username,
            }
          });
        } else {
          localStorage.setItem('token', res.data);
          this.httpServer.request({
            method: 'get',
            url: this.requestUrl.userInfoUrl + '/' + this.user.username,
          }).then(response => {
            if (response.status === 0) {
              this.helper.loginSuccessHandle(response.data);
              // this.router.navigate(['/tabs/tab1']);
              this.nav.navigateRoot(['/tabs']);
            } else {
              this.tool.showToast(res.message);
            }
          }).catch(result => {
            console.log('获取owner信息错误');
          });
        }

      } else {
        this.tool.showToast(res.message);
      }
    }).catch(result => {
      this.tool.hideLoading();
      this.tool.showToast('登录失败，请稍后重试');
    });
  }
  agreement() {
    event.stopPropagation();
    window.open("http://winnerray.com/userAgree.html", "_blank");
  }
}
