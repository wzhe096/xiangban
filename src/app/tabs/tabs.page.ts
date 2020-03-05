import { Component } from '@angular/core';
import { Platform, AlertController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { HttpRequestService } from 'src/app/service/http-request.service';
import { ToolService } from 'src/app/service/tool.service';
import { RequestUrlService } from 'src/app/service/request-url.service';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { PublicService } from '../service/public.service';
import { Device } from '@ionic-native/device/ngx';
@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    isShow: boolean = false;
    constructor(private platform: Platform,
        private splashScreen: SplashScreen,
        private appVersion: AppVersion,
        private httpServer: HttpRequestService,
        private tool: ToolService,
        private requestUrl: RequestUrlService,
        private router: Router,
        private alertCtrl: AlertController,
        private file: File,
        private fileOpener: FileOpener,
        private transfer: FileTransfer,
        private publicService: PublicService,
        private device: Device,
        private loadingCtrl: LoadingController) {
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit() {
        this.platform.ready().then(() => {
            setTimeout(() => {
                this.splashScreen.hide();
            }, 2000);
        });
        this.getversion();
        // this.versionUpdate()
    }
    //获取APP版本号
    getversion() {
        /*储存版本信息及判断存储路径开始*/
        // 读取所用的平台
        //获取当前平台信息   this.device.platform
        this.appVersion.getVersionNumber().then(data => {
            //当前app版本名  data，存储该版本名
            this.publicService.appVersion = data;
            console.log("app版本名：" + this.publicService.appVersion)
        }, error => console.error(error => {
            //获取当前版本名失败进行的操作
        }));
        this.appVersion.getVersionCode().then(data => {
            //当前app版本号  data，存储该版本号
            this.publicService.appVersionCode = data;
            console.log("app版本号：" + this.publicService.appVersionCode)
            // 获取版本更新
            this.versionUpdate();
        }, error => console.error(error => {
            //获取当前版本号失败进行的操作
        }));
        this.appVersion.getPackageName().then(data => {
            //当前应用的packageName：data，存储该包名
            this.publicService.packageName = data;
            console.log("app包名：" + this.publicService.packageName)
        }, error => console.error(error => {
            //获取该APP包名失败
        }));

        this.publicService.platform = this.device.platform;
        console.log("App设备类型：" + this.publicService.platform)
        this.publicService.savePath = this.publicService.platform == 'iOS' ? this.file.documentsDirectory : this.file.externalDataDirectory;
        //存储的沙盒地址：this.Share.savePath

        /*储存版本信息及判断存储路径结束*/
    }

    // 版本升级
    versionUpdate() {
        var platType;
        // 判断设备类型
        if (this.platform.is("ios")) {
            console.log("ios版本更新");
            platType = "ios"
        } else {
            console.log("Android版本更新");
            platType = "android"
        }
        console.log("开始请求版本信息");
        this.httpServer.request({
            method: "POST",
            url: this.requestUrl.updateAppUrl,
            data: {
                // version_code: this.publicService.appVersionCode,
                // platform: platType,
            },
        }).then(result => {
            console.log("版本更新返回数据result:" + JSON.stringify(result));
            if (result.status == "0") {
                if (this.publicService.appVersionCode == parseInt(result.data.versionCode)) {
                    this.isShow = false;
                    localStorage.setItem("update", JSON.stringify(this.isShow));
                    // this.tool.showToast("已是最新版本！");
                } else if (this.publicService.appVersionCode < parseInt(result.data.versionCode)) {
                    this.isShow = true;
                    localStorage.setItem("update", JSON.stringify(this.isShow));
                    var urls = result.data.upgradeContent;
                    console.log("版本更新返回下载地址:" + urls);
                    this.update(urls);
                    // var minCode = result.data.response.min_version_code;
                    // console.log("需要强制更新的版本号:" + minCode);
                    // if (this.publicService.appVersionCode != null) {
                    //     if (this.publicService.appVersionCode <= minCode) {
                    //         console.log('强制更新');
                    //         // this.mustUpdate(urls);
                    //     } else {
                    // this.update(urls);
                    // }
                }
            }
        }).catch(result => {
            this.isShow = false;
            localStorage.setItem("update", JSON.stringify(this.isShow));
            console.log("版本更新返回错误信息:" + result.message);//打印错误信息
        })

    }
    //版本更新弹窗
    async update(urls) {
        if (localStorage.getItem("update") == "true") {
            let alert = await this.alertCtrl.create({
                header: '版本更新',
                message: '检查到最新版本，是否进行更新',
                backdropDismiss: false,
                buttons: [
                    {
                        text: '否',
                        role: 'cancel',
                        handler: () => {
                            console.log('不进行更新');
                            this.isShow = false;
                            localStorage.setItem("update", JSON.stringify(this.isShow));
                        }
                    },
                    {
                        text: '是',
                        handler: () => {
                            console.log('更新APP');
                            console.log(urls);
                            if (this.publicService.platform == 'iOS') {
                                console.log('打开iOS下载地址----------------------------');
                                window.location.href = 'itms-services://?action=download-manifest&url=' + urls;
                            } else {
                                console.log('开始下载Android代码----------------------------');
                                this.tool.showLoading("下载中，请稍等...");
                                // loading.present();
                                const fileTransfer: FileTransferObject = this.transfer.create();
                                // fileTransfer.onProgress(progressEvent => {
                                //     var present = new Number((progressEvent.loaded / progressEvent.total) * 100);
                                //     console.log('当前进度为：' + present.toFixed(0));
                                //     var presentInt = present.toFixed(0);
                                //     // loading.data.content = "下载" + presentInt + "%";
                                // });

                                var savePath = this.publicService.savePath + 'xiangban.apk';
                                fileTransfer.download(encodeURI(urls), savePath).then((entry) => {
                                    // loading.dismiss();
                                    this.tool.hideLoading();
                                    console.log('保存apk包的地址为: ' + this.publicService.savePath);
                                    console.log('download complete: ' + entry.toURL());
                                    console.log("下载成功");

                                    this.fileOpener.open(entry.toURL(), "application/vnd.android.package-archive")
                                        .then(() => console.log('打开apk包成功！'))
                                        .catch(e => console.log('打开apk包失败！', e));
                                }, (error) => {
                                    // loading.dismiss();
                                    this.tool.hideLoading();
                                    console.log("下载失败");
                                    this.tool.showToast('由于部分手机出现异常,请您进入手机设置-应用管理-Ceshiname-权限，将存储权限打开后再进行升级，由此给您带来的不便，敬请谅解。');
                                    for (var item in error) {
                                        console.log(item + ":" + error[item]);
                                    }
                                });
                            }
                        }
                    }
                ]
            });
            await alert.present();
        }

    }
}
