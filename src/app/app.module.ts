import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpserviceService } from './demo/services/httpservice.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Network } from '@ionic-native/network/ngx';
import { RongCloudService } from './service/rong-cloud.service';
import { StorageService } from './service/storage.service';
import { HttpRequestService } from './service/http-request.service';
import { ToolService } from './service/tool.service';
import { RequestUrlService } from './service/request-url.service';
import { Camera } from '@ionic-native/camera/ngx';
import { AppMinimize } from "@ionic-native/app-minimize/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { MyinterceptorService } from './service/myinterceptor.service';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { PublicService } from './service/public.service';
import { Device } from '@ionic-native/device/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({

    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot({
        mode: 'ios',  //配置android ios 都使用一个样式
        backButtonText: "", //配置默认的返回按钮
        // backButtonIcon:"iconfont icon-jiantou2"
    }), AppRoutingModule, HttpClientModule, TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })],
    exports: [
        TranslateModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        HttpserviceService,
        TranslateService,
        Network,
        RongCloudService,
        StorageService,
        ToolService,
        RequestUrlService,
        Camera,
        AppMinimize,
        Geolocation,
        Media,
        AppVersion,
        Device,
        File,
        FileOpener,
        FileTransfer,
        Base64,
        JPush,
        LocalNotifications,
        BackgroundMode,
        AppAvailability,
        PublicService,
        InAppBrowser,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: MyinterceptorService, multi: true },
        MyinterceptorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    // 默认语言
    private lang: any = 'zh';

    constructor(private platform: Platform, public translate: TranslateService) {
        platform.ready().then(async () => {
            this.initTranslateConfig();
        });
        console.log('App start...');
    }

    public initTranslateConfig() {
        console.log('initTranslateConfig...');
        // 添加要支持的语言
        this.translate.addLangs(['zh', 'en', 'th']);
        // 设置默认语言
        const lang = window.localStorage.getItem('lang');
        if (lang) {
            this.lang = lang;
        }
        this.translate.setDefaultLang(this.lang);
        // 语言切换处理
        this.translate.use(this.lang).subscribe(() => {
            console.log('语言切换=' + this.lang);
        });
    }
}
