import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/service/http-request.service';
import { ToolService } from 'src/app/service/tool.service';
import { RequestUrlService } from 'src/app/service/request-url.service';
import { Router } from '@angular/router';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Platform } from '@ionic/angular';
declare let startApp: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  payType: any = "wechat";
  scheme: any = "";
  constructor(private httpServer: HttpRequestService,
    private tool: ToolService,
    private requestUrl: RequestUrlService,
    private router: Router,
    private appAvailability: AppAvailability,
    private platform: Platform) { }

  ngOnInit() {
    // window.open("weixin://", "_system")
  }

  jumpPay() {
    this.httpServer.request({
      method: 'POST',
      url: this.requestUrl.payUrl,
      data: {
        feeType: "THB",
        channel: this.payType,
        totalFee: "1"
      },
    }).then(result => {
      let dataInfo = result;
      if (dataInfo.status == 0) {
        // window.open(dataInfo.data, "_blank");
        const uri = dataInfo.data;
        if (this.platform.is('ios')) {
          if (this.payType == "wechat") {
            this.scheme = "weixin://"
          } else if (this.payType == "alipay") {
            this.scheme = "alipay://"
          }
        } else if (this.platform.is('android')) {
          if (this.payType == "wechat") {
            this.scheme = "com.tencent.mm"
          } else if (this.payType == "alipay") {
            this.scheme = "com.eg.android.AlipayGphone"
          }
        }
        this.appAvailability.check(this.scheme)
          .then(
            (yes: boolean) => {   /* 已安装，*/
              console.log("app已安装");
              let sApp;
              if (this.platform.is('ios')) {
                sApp = startApp.set(encodeURI(uri));
              } else {
                
                sApp = startApp.set({ /* params */
                  // "action": "ACTION_VIEW",
                  // "category": "CATEGORY_DEFAULT",
                  // "type": "text/css",
                  // "package": this.scheme,
                  // "uri": uri,
                  // "flags": ["FLAG_ACTIVITY_CLEAR_TOP", "FLAG_ACTIVITY_CLEAR_TASK"],
                  // "intentstart": "startActivity"
                  "application":this.scheme
                });
              }
              sApp.start(function () { /* success */
                console.log("OK");
              }, function (error) { /* fail */
                console.log(error);
                alert(error)
              });
            },
            (no: boolean) => {
              /* 未安装，请编写提示代码或跳转下载 */
              console.log("app未安装");
              alert(no)
            }
          );
      } else {
        this.tool.showToast("支付失败");
      }
    }).catch(result => {
      this.tool.showToast("支付失败");
    });
  }

}
