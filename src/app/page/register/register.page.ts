import { Component, OnInit } from '@angular/core';
import { GlobalData } from "../../providers/GlobalData";
import { Storage } from "../../providers/Storage";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Helper } from "../../providers/Helper";
import { HttpRequestService } from "../../service/http-request.service";
import { RequestUrlService } from "../../service/request-url.service";
import { StorageService } from "../../service/storage.service";
import { ToolService } from "../../service/tool.service";
import { Events, PickerController } from "@ionic/angular";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    loading = false;
    user = {
        username: '',
        password: ''
    };
    phonePrefixList = [
        [
            '+86',
            '+25',
            '+30'
        ]
    ];
    phonePrefix = '+86';
    verificationCode = '';
    showPhonePrefix = false;
    showVerification = true;
    VerificationTime = 60;

    constructor(private router: Router,
        public authService: AuthService,
        public userService: UserService,
        private httpServer: HttpRequestService,
        private requestUrl: RequestUrlService,
        private storageServe: StorageService,
        private tool: ToolService,
        public events: Events,
        public helper: Helper,
        public pickercontroller: PickerController
    ) {
    }

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
    //获取验证码
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
            this.tool.showToast('请输入手机号或邮箱');
            return false;
        }
        if (this.user.username.indexOf('@') > -1) {
            const regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if (!regEmail.test(this.user.username)) {
                this.tool.showToast('邮箱格式不正确');
                return false;
            }
        } else {
            const lang = Storage.localStorage.get('lang');
            if (lang === 'zh') {
                if (!(/^1[3456789]\d{9}$/.test(this.user.username))) {
                    this.tool.showToast('请输入正确的手机号');
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
            this.tool.showToast('请输入验证码');
            return false;
        }
        const regVerificationCode = /^\d{6}$/;
        if (!regVerificationCode.test(this.verificationCode)) {
            this.tool.showToast('验证码格式不正确');
            return false;
        }
        return true;
    }

    checkPassword(): boolean {
        if (!this.user.password) {
            this.tool.showToast('请输入密码');
            return false;
        }
        if (this.user.password.length < 6 || this.user.password.length > 14) {
            this.tool.showToast('密码长度不正确');
            return false;
        }
        return true;
    }

    register() {
        if (!this.checkUserName()) {
            return;
        }
        if (!this.checkVerificationCode()) {
            return;
        }
        if (!this.checkPassword()) {
            return;
        }

        this.tool.showLoading('注册中...');
        this.httpServer.request({
            method: 'post',
            url: this.requestUrl.registerUrl + '/' + this.verificationCode,
            data: this.user,
        }).then(res => {
            this.tool.hideLoading();
            if (res.status === 0) {
                localStorage.setItem('token', res.data);
                this.router.navigate(['/information-completion'], {
                    queryParams: {
                        username: this.user.username,
                        password: this.user.password
                    }
                });
                // this.httpServer.request({
                //     method: 'get',
                //     url: this.requestUrl.userInfoUrl + '/' + this.user.username,
                // }).then(response => {
                //     if (response.status === 0) {
                //         this.helper.loginSuccessHandle(response.data);
                //         this.router.navigate(['/information-completion']);
                //         // this.events.publish('new:login', 'ok', Date.now());
                //         // this.router.navigate(['/tabs/tab1']);
                //         // this.router.navigate(['/information-completion'], {
                //         //     queryParams: {
                //         //         friendName: item.name,
                //         //         time: item.lasttime,
                //         //         message: item.lastcontext,
                //         //         portrait: item.icon,
                //         //         userid: item.userid + ""
                //         //     }
                //         // });
                //     } else {
                //         this.tool.showToast(res.message);
                //     }
                // }).catch(result => {
                //     console.log('获取owner信息错误');
                // });
            } else {
                this.tool.showToast(res.message);
            }
        }).catch(result => {
            this.tool.hideLoading();
            this.tool.showToast('注册失败，请稍后重试');
        });
    }

    agreement() {
        event.stopPropagation();
        window.open("http://winnerray.com/userAgree.html", "_blank");
    }
}
