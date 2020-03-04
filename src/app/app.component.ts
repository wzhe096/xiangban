import { Component } from '@angular/core';

import { Platform, ToastController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Helper } from './providers/Helper';
import { AuthService } from './services/auth.service';
import { RongCloudService } from './service/rong-cloud.service';
import { StorageService } from './service/storage.service';
import { Subscription } from 'rxjs';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { HttpRequestService } from './service/http-request.service';
import { RequestUrlService } from './service/request-url.service';
import { ToolService } from './service/tool.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  backButtonPressed = false; // 用于判断返回键是否触发
  customBackActionSubscription: Subscription;
  url;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public helper: Helper,
    public auth: AuthService,
    private rongService: RongCloudService,
    private minimize: AppMinimize,
    public toastController: ToastController,
    public httpServer: HttpRequestService,
    public requestUrl: RequestUrlService,
    public tool: ToolService,
    public events: Events,
    public localNotifications: LocalNotifications,
    public jpush: JPush,
    private backgroundMode: BackgroundMode
  ) {
    this.initRouterListen();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
      // this.jpush.setDebugMode(true);
      // this.jpush.init();
      // this.backgroundMode.enable();
      this.registerBackButtonAction();
      if (localStorage.getItem("appkey") && localStorage.getItem("appkey") != "") {
        //注册融云服务
        this.rongService.init();
        // 监听融云的链接状况
        this.rongService.connectionStatusListener();
        // 监听融云的消息
        this.rongService.receiveMessageListener();
        if (localStorage.getItem("user_id") && localStorage.getItem("user_id") != "") {
          this.getRongToken();
        }
      } else {
        this.getAppKey();
      }
      this.events.subscribe('new:login', (message, time) => {
        console.log("接收到的消息：", message);
        if (localStorage.getItem("appkey") && localStorage.getItem("appkey") != "") {
          //注册融云服务
          this.rongService.init();
          // 监听融云的链接状况
          this.rongService.connectionStatusListener();
          // 监听融云的消息
          this.rongService.receiveMessageListener();
          if (localStorage.getItem("user_id") && localStorage.getItem("user_id") != "") {
            this.getRongToken();
          }
        } else {
          this.getAppKey();
        }
      })

    });
  }
  //获取appKey
  getAppKey() {
    this.httpServer.request({
      method: 'POST',
      url: this.requestUrl.appkeyUrl,
      data: {
      },
    }).then(result => {
      let dataInfo = result;
      if (result.status == 0) {
        var appkey = dataInfo.data;
        localStorage.setItem("appkey", appkey);
        //注册融云服务
        this.rongService.init();
        // 监听融云的链接状况
        this.rongService.connectionStatusListener();
        // 监听融云的消息
        this.rongService.receiveMessageListener();
        //如果存在融云token
        if (localStorage.getItem("rytoken") && localStorage.getItem("rytoken") != "") {
          this.connectRongCloud(localStorage.getItem("rytoken"));
        } else {
          //不存在融云token
          if (localStorage.getItem("user_id") && localStorage.getItem("user_id") != "") {
            //存在用户的唯一标识，去请求token
            this.getRongToken();
          }
        }

      } else {
        this.tool.showToast("注册融云服务失败！");
      }
    }).catch(result => {
    });
  }
  //获取token
  getRongToken() {
    this.httpServer.request({
      method: 'POST',
      url: this.requestUrl.tokenUrl,
      data: {
        userId: localStorage.getItem("user_id"),
        appKey: localStorage.getItem("appkey")
      },
    }).then(result => {
      let dataInfo = result;
      if (result.status == 0) {
        let rytoken = dataInfo.data.token;
        localStorage.setItem("rytoken", rytoken);
        this.connectRongCloud(rytoken);
      } else {
        this.tool.showToast("注册融云服务失败！");
      }
    }).catch(result => {

    });
  }
  /**
  * 连接融云
  */
  async connectRongCloud(rytoken) {
    if (this.rongService.getCurrentConnectionStatus() != 0) {

      //链接融云服务器
      this.rongService.connect(rytoken).then((userId) => {
        // 成功连接融云服务
        console.log('登录融云成功：' + userId);
        localStorage.setItem("user_id", userId);
      }).catch((error) => {
        // 登录失败处理
        console.log('登录聊天服务器失败' + error)
      })
    }

  }
  //最小化APP
  registerBackButtonAction() {
    this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
      if (this.url === '/tabs'
        || this.url === '/tabs/tab1'
        || this.url === '/tabs/tab2'
        || this.url === '/tabs/tab3'
        || this.url === '/tabs/mine'
        || this.url === '/signin') { // 监测到当前路由，判断是否要退出程序
        if (this.backButtonPressed) {
          this.minimize.minimize(); // 程序最小化
          // this.rongService.disconnectRy()
          this.backButtonPressed = false;
        } else {
          this.miniApp(); // 提示toast
          this.backButtonPressed = true;
          this.events.unsubscribe('new:login')
          setTimeout(() => this.backButtonPressed = false, 2000);
        }
      }
    });
  }
  //监听个页面路由
  initRouterListen() {
    this.router.events.subscribe(event => { // 需要放到最后一个执行
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        console.log(this.url);
      }
    });
  }
  //提示
  async miniApp() {
    const toast = await this.toastController.create({
      message: '再按一次退出应用',
      duration: 1000
    });
    toast.present();
  }
  //监听本地消息
  registerlocalNotifications() {
    this.localNotifications.on('click').subscribe(result => {
      console.log("点击消息栏");
    });
  }
}
