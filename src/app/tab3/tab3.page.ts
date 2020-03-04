import { Component } from '@angular/core';
import { HttpserviceService } from '../demo/services/httpservice.service';
import { getLocaleDateFormat } from '@angular/common';
import { HttpRequestService } from '../service/http-request.service';
import { ToolService } from '../service/tool.service';
import { RequestUrlService } from '../service/request-url.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  list: any[] = [];
  page: any = 1;
  rows: any = 20;
  maxPage: any = 1;
  Infinite: any;
  myInfo = {
    friendNum: 23,
    attention: 12,
    fans: 56,
    blacklist: 17
  };
  friendList: any = [];
  blackList: any = [];
  public type: any = 'friend';
  constructor(
    public http: HttpserviceService,
    private httpServer: HttpRequestService,
    private tool: ToolService,
    private requestUrl: RequestUrlService,
    private router: Router,
    private alertController: AlertController) { }
  ngOnInit(): void {
    this.getFriendList(this.type);
  }
  //选择类型
  selectType(type) {
    this.type = type;
    if (type == "blacklist") {
      this.getBlackList(type);
    } else {
      this.getFriendList(type);
    }

  }
  //跳转聊天
  jumpChat(item) {
    this.router.navigate(["/chat"], {
      queryParams: {
        friendName: item.name,
        time: item.lasttime,
        message: item.lastcontext,
        portrait: item.icon,
        userid: item.userid + ""
      }
    })
  }
  //移出黑名单
  removeBlack(item) {
    event.stopPropagation();
    this.presentAlertConfirm(item)
  }

  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      header: '提示',
      message: '将好友移出黑名单？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          handler: () => {
            console.log('Confirm Okay');
            this.httpServer.request({
              method: 'POST',
              url: this.requestUrl.removeBlackUrl,
              data: {
                "beUserId": item.beUserId,
                "userId": item.userId
              },
            }).then(result => {
              console.log(result);
              let dataInfo = result;
              if (dataInfo.status == 0) {
                //从黑名单中删除
                this.blackList.forEach((element, index) => {
                  if (item.username == element.username) {
                    this.blackList.splice(index, 1);
                  }
                });
              } else {
                this.tool.showToast("移出失败");
              }
            }).catch(result => {
              this.tool.showToast("移出失败");
            });
          }
        }
      ]
    });
    await alert.present();
  }


  //获取好友列表
  getFriendList(type) {
    // if (this.Infinite) {
    //   this.Infinite.enable(true);
    // }
    // this.page = 1;
    // this.tool.showLoading(this.tool.getLanguage("Message.Loading"));
    this.httpServer.request({
      method: 'POST',
      url: this.requestUrl.friendListUrl,
      data: {
        userId: localStorage.getItem("user_id"),
        page: this.page.toString(),
        rows: this.rows.toString(),
        type: type
      },
    }).then(result => {
      // this.tool.hideLoading();
      this.friendList = [];
      let dataInfo = result;
      if (result.status == 0) {
        this.friendList = dataInfo.data;
        // console.log(this.friendList);//打印返回的数据
        // this.maxPage = Math.ceil(dataInfo.response.total / this.rows);
        // console.log(this.maxPage);//最大页数
      } else {
        // this.tool.showToast(storeListInfo.message);
      }
    }).catch(result => {
      //this.tool.showToast(result);
      // this.tool.hideLoading();
    });
  }

  //获取黑名单列表
  getBlackList(type) {
    // if (this.Infinite) {
    //   this.Infinite.enable(true);
    // }
    // this.page = 1;
    // this.tool.showLoading(this.tool.getLanguage("Message.Loading"));
    this.httpServer.request({
      method: 'POST',
      url: this.requestUrl.blackListUrl,
      data: {
        userId: localStorage.getItem("user_id"),
        page: this.page.toString(),
        rows: this.rows.toString(),
        type: type
      },
    }).then(result => {
      // this.tool.hideLoading();
      this.blackList = [];
      let dataInfo = result;
      if (result.status == 0) {
        this.blackList = dataInfo.data;
        // console.log(this.friendList);//打印返回的数据
        // this.maxPage = Math.ceil(dataInfo.response.total / this.rows);
        // console.log(this.maxPage);//最大页数
      } else {
        // this.tool.showToast(storeListInfo.message);
      }
    }).catch(result => {
      //this.tool.showToast(result);
      // this.tool.hideLoading();
    });
  }
  // //获取更多店铺列表
  // getMoreList(infiniteScroll) {
  //   this.Infinite = infiniteScroll;
  //   this.page++;
  //   if (this.page > this.maxPage) {
  //     this.page--;
  //     var interval = setInterval(() => {
  //       infiniteScroll.complete();
  //       clearInterval(interval);
  //       this.Infinite.enable(false);
  //       // this.moreStatus = true;
  //     }, 1000);
  //     return;
  //   } else {
  //     this.httpServer.request({
  //       method: 'POST',
  //       url: this.requestUrl.friendListUrl,
  //       data: {
  //         type: "friend",
  //         page: this.page.toString(),
  //         rows: this.rows.toString(),
  //       },
  //     }).then(result => {

  //       let dataInfo = result;
  //       if (dataInfo.code == "001000") {
  //         var list = dataInfo.response.rows;
  //         list.forEach(element => {
  //           this.friendList.push(element);
  //         });
  //         console.log(this.friendList);//打印返回的数据
  //         this.maxPage = Math.ceil(dataInfo.response.total / this.rows);
  //         console.log(this.maxPage);//最大页数
  //         this.Infinite.complete();
  //         if (this.page < this.maxPage) {
  //           this.Infinite.enable(true);
  //           // this.moreStatus = false;
  //         }
  //       } else {
  //         // this.tool.showToast(storeListInfo.message);
  //         this.Infinite.complete();
  //         this.Infinite.enable(false);
  //       }
  //     }).catch(result => {
  //       console.log(result);
  //       this.Infinite.complete();
  //       this.Infinite.enable(false);
  //     });

  //   }
  // }

}

