import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {Helper} from "../../providers/Helper";
import {Storage} from "../../providers/Storage";
import {GlobalData} from "../../providers/GlobalData";
import {HttpRequestService} from "../../service/http-request.service";
import {RequestUrlService} from "../../service/request-url.service";
import {StorageService} from "../../service/storage.service";
import {ToolService} from "../../service/tool.service";

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.page.html',
  styleUrls: ['./modify-password.page.scss'],
})
export class ModifyPasswordPage implements OnInit {

  loading = false;
  user = {
    username: '',
    password: ''
  };

  verificationCode = '';

  showVerification = true;
  VerificationTime = 60;
  constructor(private router: Router,
              public authService: AuthService,
              public userService: UserService,
              private httpServer: HttpRequestService,
              private requestUrl: RequestUrlService,
              private storageServe: StorageService,
              private tool: ToolService,
              public helper: Helper,
  ) { }

  ngOnInit() {
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
  checkPassword(): boolean {
    if (!this.user.password) {
      this.helper.toast('请输入密码');
      return false;
    }
    if (this.user.password.length < 6 || this.user.password.length > 14) {
      this.helper.toast('密码长度不正确');
      return false;
    }
    return true;
  }
  modifyPassword() {
    if (!this.checkUserName()) {
      return;
    }
    if (!this.checkVerificationCode()) {
      return;
    }
    if (!this.checkPassword()) {
      return;
    }
    this.httpServer.request({
      method: 'post',
      url: this.requestUrl.modifyPasswordUrl + '/' + this.user.username,
      data: this.user,
    }).then(response => {
      if (response.status === 0) {
        this.router.navigate(['/signin']);
      } else {
        this.tool.showToast(response.message);
      }
    }).catch(result => {
    });
  }
}
