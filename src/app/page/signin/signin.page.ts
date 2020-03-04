import {Component, OnInit} from '@angular/core';
import {Storage} from '../../providers/Storage';
import {AuthService} from '../../services/auth.service';
import {HttpService} from '../../providers/HttpService';
import {Helper} from "../../providers/Helper";
import {Router} from "@angular/router";
import {NavController} from '@ionic/angular';
import {UserService} from "../../services/user.service";
import {GlobalData} from '../../providers/GlobalData';
import {HttpRequestService} from "../../service/http-request.service";
import {RequestUrlService} from "../../service/request-url.service";
import {ToolService} from "../../service/tool.service";
import {StorageService} from "../../service/storage.service";

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

    constructor(public http: HttpService,
                public authService: AuthService,
                public userService: UserService,
                private httpServer: HttpRequestService,
                private requestUrl: RequestUrlService,
                private storageServe: StorageService,
                private tool: ToolService,
                public helper: Helper,
                private router: Router,
                private nav: NavController,
                ) {
    }

    ngOnInit() {
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
                this.storageServe.write('token', res.data);
                this.httpServer.request({
                    method: 'get',
                    url: this.requestUrl.userInfoUrl + '/' + this.user.username,
                }).then(response => {
                    if (response.status === 0) {
                        this.helper.loginSuccessHandle(response.data);
                        this.router.navigate(['/tabs/tab1']);
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
