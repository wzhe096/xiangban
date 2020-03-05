import { Component, OnInit } from '@angular/core';
import { Storage } from '../../providers/Storage';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../providers/HttpService';
import { Helper } from "../../providers/Helper";
import { Router } from "@angular/router";
import { NavController, PickerController } from '@ionic/angular';
import { UserService } from "../../services/user.service";
import { GlobalData } from '../../providers/GlobalData';
import { HttpRequestService } from "../../service/http-request.service";
import { RequestUrlService } from "../../service/request-url.service";
import { ToolService } from "../../service/tool.service";
import { StorageService } from "../../service/storage.service";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.page.html',
    styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
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
    constructor(public http: HttpService,
        public authService: AuthService,
        public userService: UserService,
        private httpServer: HttpRequestService,
        private requestUrl: RequestUrlService,
        private tool: ToolService,
        public helper: Helper,
        private router: Router,
        private nav: NavController,
        private pickercontroller: PickerController
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
    signIn() {
        this.tool.showLoading('登录中');
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
                    url: this.requestUrl.userInfoUrl + '/' + this.user.username,
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
    agreement() {
        event.stopPropagation();
        window.open("http://winnerray.com/userAgree.html", "_blank");
    }
}
