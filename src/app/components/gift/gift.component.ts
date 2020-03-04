import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/service/http-request.service';
import { ToolService } from 'src/app/service/tool.service';
import { RequestUrlService } from 'src/app/service/request-url.service';
@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.scss'],
})
export class GiftComponent implements OnInit {
  giftList: any = []
  num: any = 1;
  showItemGift: any = false;
  oldtime: any;
  numberSrc: any = "";
  giftnum: any = 0;
  selectGift: any = {};
  friendid: any;
  userid: any = localStorage.getItem('user_id');
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  public interval: any;
  constructor(private modalController: ModalController,
    private router: Router,
    private httpServer: HttpRequestService,
    private tool: ToolService,
    private requestUrl: RequestUrlService,
    public navParams: NavParams) {
    this.friendid = this.navParams.get('friendid');
  }

  ngOnInit() {
    this.getGiftList();
    this.oldtime = new Date().getTime();

  }
  //关闭模态框
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
  //前往充值
  jumpRecharge() {
    this.router.navigate(["/recharge"]);
    this.dismiss();
  }
  numDown() {
    this.num == 0 ? 0 : this.num--;
  }
  numUp() {
    this.num++;
  }
  select(gift) {
    event.stopPropagation();
    this.selectGift = gift;
    console.log("选中的礼物", this.selectGift)

  }
  sendGift() {
    this.tool.showLoading("请稍等...");
    this.httpServer.request({
      method: 'POST',
      url: this.requestUrl.sendGiftUrl,
      data: {
        giftCount: this.num,
        giftId: this.selectGift.id,
        toUserId: this.friendid,
        userId: this.userid
      },
    }).then(result => {
      this.tool.hideLoading();
      let dataInfo = result;
      if (result.status == 0) {
        this.giftList = dataInfo.data;
        if (this.interval) {
          clearInterval(this.interval);
        }
        let newtime = new Date().getTime();
        if (newtime - this.oldtime > 2000) {
          this.giftnum = 0;
          this.giftnum += this.num;
          this.numberSrc = "assets/img/n" + this.giftnum + ".png"
        } else {
          this.giftnum += this.num;
          this.numberSrc = "assets/img/n" + this.giftnum + ".png"
        }
        this.oldtime = newtime;
        this.showItemGift = true;
        this.interval = setInterval(() => {
          this.giftnum = 0;
          this.showItemGift = false;
        }, 2000);
      } else {
        this.tool.showToast(result.message);
      }
    }).catch(result => {
      //this.tool.showToast(result);
      this.tool.hideLoading();
    });

  }

  //获取礼物列表
  getGiftList() {
    // if (this.Infinite) {
    //   this.Infinite.enable(true);
    // }
    // this.page = 1;
    // this.tool.showLoading(this.tool.getLanguage("Message.Loading"));
    this.httpServer.request({
      method: 'POST',
      url: this.requestUrl.giftListUrl,
      data: {
      },
    }).then(result => {
      // this.tool.hideLoading();
      this.giftList = [];
      let dataInfo = result;
      if (result.status == 0) {
        this.giftList = dataInfo.data;
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
}
