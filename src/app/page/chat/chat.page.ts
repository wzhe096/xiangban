import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, ModalController, ActionSheetController, IonContent, Events, PopoverController, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RongCloudService } from 'src/app/service/rong-cloud.service';
import { StorageService } from 'src/app/service/storage.service';
import { GiftComponent } from 'src/app/components/gift/gift.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToolService } from 'src/app/service/tool.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { TitleMeunComponent } from 'src/app/components/title-meun/title-meun.component';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { HttpRequestService } from 'src/app/service/http-request.service';
import { RequestUrlService } from 'src/app/service/request-url.service';
declare let RongIMLib: any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;
  messageList: any = [];
  userid: any = localStorage.getItem('user_id');
  num: any = 0;
  commonLanList: any = [
    "万水千山总是情，加个好友行不行？",
    "我今天第一个问候送给你啦！",
    "等风等雨也在等你。",
    "想在你的温柔里躲一躲。",
    "想认识你，又不知道好方法，所以直接过来跟你打招呼。"
  ];
  showCommonLst: any = false;
  showGift: any = false;
  showItemGift: any = false;
  messageData: any = "";
  locationData: any;
  faceList: any = [];
  showFaceList: any = false;
  showList: any = false;
  //我的融云信息
  myId: any;
  myName: any;
  myPortrait: any;
  //好友的融云信息
  friendId: any;
  friendName: any;
  friendPortrait: any;
  filePath: any; //录音文件的名字
  recordData: any; //录音对象
  isStart: boolean = false;
  btntext: any = "按住 说话"

  constructor(public toastController: ToastController,
    public alertController: AlertController,
    public rongcloud: RongCloudService,
    private storageService: StorageService,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private tool: ToolService,
    public router: Router,
    public activated: ActivatedRoute,
    public events: Events,
    public popoverController: PopoverController,
    public nav: NavController,
    public file: File,
    public media: Media,
    private base64: Base64,
    public httpServer: HttpRequestService,
    public requestUrl: RequestUrlService,
    private transfer: FileTransfer,
  ) {
    //监听选择的定位
    this.activated.queryParams.subscribe((params: Params) => {
      this.locationData = {
        latitude: params['lat'],
        longitude: params['lng'],
        address: params['address'],
        canSend: params['canSend']
      };
      //好友的融云信息
      if (params['userid'] && params['userid'] != "") {
        this.friendId = params['userid']
      }
      if (params['friendName'] && params['friendName'] != "") {
        this.friendName = params['friendName']
      }
      if (params['portrait'] && params['portrait'] != "") {
        this.friendPortrait = params['portrait']
      }
    })
    console.log("好友id和名称：" + this.friendId + this.friendName)
    this.myId = localStorage.getItem("user_id");
    this.myName = "我"
    this.myPortrait = "assets/img/444.png"
  }
  ngOnInit() {
    //获取表情列表
    this.faceList = RongIMLib.RongIMEmoji.list;
    this.rongcloud.getHistoryMessageList(RongIMLib.ConversationType.PRIVATE, this.friendId, 0, 20).then((list) => {
      this.messageList = list;
      console.log(this.messageList);
      this.scrollToBottom();
    }).catch((error) => {
      console.log('获取历史记录失败' + error)
    })

  }
  ionViewWillEnter() {
    console.log("当前连接状态：" + this.rongcloud.getCurrentConnectionStatus());
    //如果存在 就发送
    if (this.locationData && this.locationData.canSend == "y") {
      console.log(this.locationData);
      this.sendLocationMsg(this.locationData);
    }
    //监听收到的好友发的消息
    this.events.subscribe('new:message', (message, time) => {
      console.log("接收到的消息：", message);
      if (message) {
        var messageContent = message.content;
        // 判断消息类型
        switch (message.messageType) {
          case RongIMLib.RongIMClient.MessageType.TextMessage: // 文字消息
            console.log('文字内容', messageContent.content);
            // this.tool.showToast("收到了消息内容:" + messageContent.content)
            if (message.senderUserId == this.friendId) {
              this.messageList.push(message);
              this.scrollToBottom();
            }
            break;
          case RongIMLib.RongIMClient.MessageType.ImageMessage: // 图片消息
            console.log('图片缩略图 base64', messageContent.content);
            console.log('原图 url', messageContent.imageUri);
            if (message.senderUserId == this.friendId) {
              this.messageList.push(message);
              this.scrollToBottom();
            }
            break;
          case RongIMLib.RongIMClient.MessageType.HQVoiceMessage: // 音频消息
            console.log('音频 type ', messageContent.type); // 编解码类型，默认为 aac 音频
            console.log('音频 url', messageContent.remoteUrl); // 播放：<audio src={remoteUrl} />
            console.log('音频 时长', messageContent.duration);
            if (message.senderUserId == this.friendId) {
              this.messageList.push(message);
              this.scrollToBottom();
            }
            break;
          case RongIMLib.RongIMClient.MessageType.VoiceMessage:
            // 对声音进行预加载                
            // message.content.content 格式为 AMR 格式的 base64 码
            console.log("语音的源码：", messageContent.content);
            if (message.senderUserId == this.friendId) {
              this.messageList.push(message);
              this.scrollToBottom();
            }
            break;
          case RongIMLib.RongIMClient.MessageType.LocationMessage:
            // message.content.latiude => 纬度。
            // message.content.longitude => 经度。
            // message.content.content => 位置图片 base64。
            if (message.senderUserId == this.friendId) {
              this.messageList.push(message);
              this.scrollToBottom();
            }
            break
          case RongIMLib.RongIMClient.MessageType.UnknownMessage: // 未知消息
            console.log('未知消息, 请检查消息自定义格式是否正确', message);
            break;
          default:
            console.log('收到消息', message);
            break;
        }
      }
    })
  }
  ionViewDidLeave() {
    this.events.unsubscribe('new:message')        //注销Events事件q
  }
  ionViewWillUnload() {
    this.events.unsubscribe('new:message')        //注销Events事件q
  }
  /**滚到底部 */
  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(1);
    }, 100);
  }
  //是否打开录音
  reocrd() {
    if (this.isStart) {
      this.isStart = false;
      this.btntext = "按住 说话"
    } else {
      this.isStart = true;
      this.btntext = "按住 说话"
    }
    // this.playVoice("1");
    // this.play();
  }
  startReocrd() {  //开始录音
    console.log("开始录音");
    //文件URL，文件存放在拓展内存卡中文件夹下，命名为Record.mp3
    this.filePath = this.file.externalDataDirectory + "Record.aac";

    //创建media对象，参数文件名字，上面的filePath也指定了文件存放位置和文件名字
    this.recordData = this.media.create(this.filePath);
    //开始录音
    this.tool.showLoading("开始录音...");
    this.btntext = "松开 结束"
    this.recordData.startRecord();

  }
  pauseRecord() {
    //暂停录音
    this.recordData.pauseRecord();
  }
  play() {
    //播放录音
    this.recordData.play();
  }
  resumeRecord() {
    //继续播放录音
    this.recordData.resumeRecord();
  }
  stopRecord() {
    console.log("停止录音并播放");
    this.tool.hideLoading();
    //停止结束录音
    this.recordData.stopRecord();
    this.btntext = "按住 说话"
    // this.play();
    // this.file.readAsDataURL(this.file.externalDataDirectory, "Record.aac").then((base64File: string) => {
    //   console.log("读取完成");
    //   console.log(JSON.stringify(base64File));
    //   this.sendVoice(base64File.split("base64,")[1]);
    // }, (err) => {
    //   console.log("读取失败");
    //   console.log(err);
    // });
    // // this.base64.encodeFile(this.filePath).then((base64File: string) => {
    //   console.log("转换完成");
    //   console.log(base64File);
    //   this.sendVoice(base64File.split("base64,")[1]);
    // }, (err) => {
    //   console.log("转换失败");
    //   console.log(err);
    // });
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: new Date().getTime() + '.acc',
      headers: {}
    }
    fileTransfer.upload(this.filePath, this.requestUrl.commentBaseUrl + this.requestUrl.uploadFileUrl, options)
      .then((data) => {
        // success
        console.log(JSON.stringify(data))
        if (data.response != "") {
          let newData = JSON.parse(data.response);
          let url = this.requestUrl.commentBaseUrl + "/" + newData.filePath;
          this.sendVoice(url)
        }
      }, (err) => {
        // error
        console.log(JSON.stringify(err))
        this.tool.showToast("录音失败")
      })
  }
  //播放语音
  playVoice(data) {
    console.log("开始播放");
    let bleep = new Audio();
    bleep.src = data;
    bleep.play();
    // myAudio.play();
    // var audioFile = data;
    // // 音频文件长度   
    // var duration = audioFile.length / 1024;
    // console.log(audioFile.length);
    // // 预加载
    // RongIMLib.RongIMVoice.preLoaded(audioFile, function () {
    //   // 播放声音
    //   RongIMLib.RongIMVoice.play(audioFile, duration);
    // });
  }
  //弹出选择礼物模块
  async presentModal() {
    const modal = await this.modalController.create({
      component: GiftComponent,
      showBackdrop: false,
      backdropDismiss: true,
      keyboardClose: true,
      cssClass: "modal-transparent",
      componentProps: { friendid: this.friendId }   //传值
    });
    await modal.present();
    //监听销毁的事件
    const { data } = await modal.onDidDismiss(); //获取关闭传回的值
    console.log(data);

  }
  //弹出顶部菜单
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TitleMeunComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
    //监听销毁的事件
    const { data } = await popover.onDidDismiss(); //获取关闭传回的值
    console.log(data);
  }

  /**
  * 消息提示
  * @param msg
  */
  async reported(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'dark',
      position: 'middle',
      cssClass: 'toast' //只能在theme/variables.css或者global.scss进行修饰
    });
    toast.present();
  }
  changeText(text) {
    return RongIMLib.RongIMEmoji.symbolToEmoji(text);
  }
  //发送地理位置信息
  sendLocationMsg(locationData) {
    var latitude = parseFloat(locationData.latitude);
    var longitude = parseFloat(locationData.longitude);
    var poi = locationData.address;
    var content = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKE';  // 位置图片 base64
    var user = {
      id: this.myId,
      name: this.myName,
      portrait: this.myPortrait //头像 
    };
    var msg = new RongIMLib.LocationMessage({
      latitude: latitude,
      longitude: longitude,
      poi: poi,
      content: content,
      user: user
    });
    var conversationType = RongIMLib.ConversationType.PRIVATE;
    var targetId = this.friendId;  // 目标 Id
    console.log("目标人的ID：" + targetId);
    var pushContent = targetId + '发送了一条消息';  // Push 显示内容
    this.rongcloud.sendMessage(conversationType, targetId, msg, pushContent).then((message) => {
      console.log('发送位置消息成功', message);
      this.messageList.push(message);
      this.scrollToBottom();
      this.locationData = null;
    }).catch((errorCode) => {
      console.log('发送位置消息失败', errorCode);
      alert('发送位置消息失败' + errorCode)
    })
  }
  //发送文本消息
  sendMsg(data) {
    this.showFaceList = false;
    var user = {
      id: this.myId,
      name: this.myName,
      portrait: this.myPortrait //头像 
    };
    var msg = new RongIMLib.TextMessage({ content: data, user: user });
    var conversationType = RongIMLib.ConversationType.PRIVATE;
    var targetId = this.friendId;  // 目标 Id
    console.log("目标人的ID：" + targetId);
    var pushContent = targetId + '发送了一条消息';  // Push 显示内容
    this.rongcloud.sendMessage(conversationType, targetId, msg, pushContent).then((message) => {
      console.log('发送文本消息成功', message);
      this.messageList.push(message);
      console.log(this.messageList);
      this.scrollToBottom();
    }).catch((errorCode) => {
      console.log('发送文本消息失败', errorCode);
      alert('发送文本消息失败' + errorCode)
    })
    this.messageData = "";
  }
  //发送语音消息
  sendVoice(data) {
    this.showFaceList = false;
    var user = {
      id: this.myId,
      name: this.myName,
      portrait: this.myPortrait //头像 
    };
    var msg = new RongIMLib.HQVoiceMessage({
      localPath: "",
      remoteUrl: data,
      type: "acc",
      duration: 60, user: user
    });
    var conversationType = RongIMLib.ConversationType.PRIVATE;
    var targetId = this.friendId;  // 目标 Id
    console.log("目标人的ID：" + targetId);
    var pushContent = targetId + '发送了一条消息';  // Push 显示内容
    this.rongcloud.sendMessage(conversationType, targetId, msg, pushContent).then((message) => {
      console.log('语音消息成功', message);
      this.messageList.push(message);
      this.scrollToBottom();
    }).catch((errorCode) => {
      console.log('发送语音消息失败', errorCode);
      alert('发送语音消息失败' + errorCode)
    })
    this.messageData = "";
  }
  /**
   * 已邀约
   */
  async presentToast() {
    const toast = await this.toastController.create({
      message: '对方已应邀',
      duration: 2000,
      color: '#F2F2F2',
      position: 'middle',
      cssClass: 'toast' //只能在theme/variables.css或者global.scss进行修饰
    });
    toast.present();
  }
  /**
   * 右上角菜单
   */
  showMenu(event) {
    event.stopPropagation();
    if (this.showList) {
      this.showList = false;
    } else {
      this.showList = true;
    }
  }
  /**
   * 常用语
   */
  commonLan() {
    event.stopPropagation();
    if (this.showCommonLst) {
      this.showCommonLst = false;
    } else {
      this.showCommonLst = true;
    }
    this.showFaceList = false;
  }

  //选择表情
  showFace() {
    event.stopPropagation();
    if (this.showFaceList) {
      this.showFaceList = false;
    } else {
      this.showFaceList = true;
    }
    this.showCommonLst = false;
  }
  //选择表情
  addFace(item) {
    this.messageData = this.messageData + item.symbol;
  }
  /**
   * 礼物
   */
  giftClick() {
    event.stopPropagation();
    this.showCommonLst = false;
    this.showFaceList = false;
    this.showList = false;
    this.presentModal();
  }
  //选择常用语
  setText(item) {
    this.messageData = item;
    this.showCommonLst = false;
    this.showList = false;
  }
  //发送图片
  async chooseImg() {
    this.showCommonLst = false;
    this.showFaceList = false;
    this.showList = false;
    const actionSheet = await this.actionSheetCtrl.create({
      // title: 'Modify your album',
      mode: "ios",
      buttons: [
        {
          text: "相机",
          role: 'boy',
          handler: () => {
            console.log('Destructive clicked');
            const options: CameraOptions = {
              targetWidth: 900,
              targetHeight: 900
            }
            this.tool.getPictureByCamera(options).then(imageBase64 => {
              console.log("相机返回数据：" + imageBase64)
              let base64Image = 'data:image/jpeg;base64,' + imageBase64;
              console.log("选择的图片：" + base64Image);
              // var imageUri = 'https://www.rongcloud.cn/images/newVersion/log_wx.png';  // 上传到服务器的 url. 用来展示高清图片
              //上传图片
              this.httpServer.request({
                method: 'POST',
                url: this.requestUrl.uploadbase64ImgUrl,
                data: {
                  baseStr: imageBase64,
                  random: "1"
                },
              }).then(result => {
                console.log(result);
                let dataInfo = result;
                if (dataInfo.status == 0) {
                  let imageUri = this.requestUrl.imageBaseUrl + dataInfo.data;
                  var user = {
                    id: this.myId,
                    name: this.myName,
                    portrait: this.myPortrait //头像 
                  };
                  var msg = new RongIMLib.ImageMessage({ content: "", imageUri: imageUri, user: user });
                  var conversationType = RongIMLib.ConversationType.PRIVATE;
                  var targetId = this.friendId;  // 目标 Id
                  console.log("目标人的ID：" + targetId);
                  var pushContent = targetId + '发送了一条消息';  // Push 显示内容
                  this.rongcloud.sendMessage(conversationType, targetId, msg, pushContent).then((message) => {
                    console.log('发送图片消息成功', message);
                    this.messageList.push(message);
                    this.scrollToBottom();
                  }).catch((errorCode) => {
                    console.log('发送图片消息失败', errorCode);
                    alert('发送图片消息失败' + errorCode)
                  })
                } else {
                  this.tool.showToast("上传失败");
                }
              }).catch(result => {

              });
            });
          }
        }, {
          text: "图库",
          role: 'girl',
          handler: () => {
            const options: CameraOptions = {
              targetWidth: 900,
              targetHeight: 900
            }
            this.tool.getPictureByPhotoLibrary(options).then(imageBase64 => {
              let base64Image = 'data:image/jpeg;base64,' + imageBase64;
              console.log("选择的图片：" + base64Image);
              // var imageUri = 'https://www.rongcloud.cn/images/newVersion/log_wx.png';  // 上传到服务器的 url. 用来展示高清图片
              //上传图片
              this.httpServer.request({
                method: 'POST',
                url: this.requestUrl.uploadbase64ImgUrl,
                data: {
                  baseStr: imageBase64,
                  random: "1"
                },
              }).then(result => {
                console.log(result);
                let dataInfo = result;
                if (dataInfo.status == 0) {
                  let imageUri = this.requestUrl.imageBaseUrl + dataInfo.data;
                  var user = {
                    id: this.myId,
                    name: this.myName,
                    portrait: this.myPortrait //头像 
                  };
                  var msg = new RongIMLib.ImageMessage({ content: "", imageUri: imageUri, user: user });
                  var conversationType = RongIMLib.ConversationType.PRIVATE;
                  var targetId = this.friendId;  // 目标 Id
                  console.log("目标人的ID：" + targetId);
                  var pushContent = targetId + '发送了一条消息';  // Push 显示内容
                  this.rongcloud.sendMessage(conversationType, targetId, msg, pushContent).then((message) => {
                    console.log('发送图片消息成功', message);
                    this.messageList.push(message);
                    this.scrollToBottom();
                  }).catch((errorCode) => {
                    console.log('发送图片消息失败', errorCode);
                    alert('发送图片消息失败' + errorCode)
                  })
                } else {
                  this.tool.showToast("上传失败");
                }
              }).catch(result => {

              });
            });
          }
        }, {
          text: "取消",
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
  //选择发送定位
  sendLocation() {
    this.showCommonLst = false;
    this.showFaceList = false;
    this.showList = false;
    if (localStorage.getItem("lang") == "zh") {
      this.router.navigate(['/baidu-map']);
    } else {
      this.router.navigate(['/baidu-map']);
    }
  }
  //拉黑
  addBlacklist(friendId) {
    this.presentAlertConfirm(this.friendId);
  }
  async presentAlertConfirm(friendid) {
    const alert = await this.alertController.create({
      header: '提示',
      message: '移入黑名单？',
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
              url: this.requestUrl.addBlackUrl,
              data: {
                "beUserId": friendid,
                "userId": localStorage.getItem("user_id")
              },
            }).then(result => {
              console.log(result);
              let dataInfo = result;
              if (dataInfo.status == 0) {
                this.showList = false;
                this.nav.navigateBack(['/tabs/tab3']);
              } else {
                this.tool.showToast("拉黑失败");
              }
            }).catch(result => {
              this.tool.showToast("拉黑失败");
            });
          }
        }
      ]
    });
    await alert.present();
  }
  //消息免打扰
  addDND(friendid) {
    this.presentAlertConfirmDND();
  }
  async presentAlertConfirmDND() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '设置为消息免打扰？',
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
            this.showList = false;
            this.nav.navigateBack(['/tabs/tab3']);
          }
        }
      ]
    });
    await alert.present();
  }
  //匿名举报
  jumpReport(friendId) {
    this.locationData = null;
    this.showList = false;
    this.router.navigate(['/report'], {
      queryParams: {
        id: friendId,
      }
    });
  }
  //应邀
  jumpInvited(friendId) {
    this.router.navigate(['/order'], {
      queryParams: {
        id: friendId,
      }
    });
  }
}
