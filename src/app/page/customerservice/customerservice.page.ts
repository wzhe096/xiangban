import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, ModalController, ActionSheetController, IonContent, Events, PopoverController, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RongCloudService } from 'src/app/service/rong-cloud.service';
import { StorageService } from 'src/app/service/storage.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToolService } from 'src/app/service/tool.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { GiftComponent } from 'src/app/components/gift/gift.component';
declare let RongIMLib: any;

@Component({
  selector: 'app-customerservice',
  templateUrl: './customerservice.page.html',
  styleUrls: ['./customerservice.page.scss'],
})
export class CustomerservicePage implements OnInit {

  @ViewChild(IonContent, { static: true }) content: IonContent;
  peapleInfo: any = [];
  userid: any = localStorage.getItem('userid');
  friendInfo: any = {
    message: "",
    time: "15:20"
  };
  customerservice: true;
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
  // rytoken: string = "7WO8P68hHGbIx8rIVDwpbQWEECFDSgEVhukg6j9mvh+c2NePZtUIYpn7NiZyPCByEXZmcYODOVe5oyCYYFFLLQ==";
  rytoken: string = "HxPvVsVl7FDVG6qCkYPJz871H4Pn+AOT4cZon+rYIzrk/wKOceHPQoZ1cNYzSgA+Wqo14p9Exz3QctSeVR+cCQ==";
  locationData: any;
  faceList: any = [];
  showFaceList: any = false;
  showList: any = false;
  //我的融云信息
  myId: any = "520520"
  myName: any = "我"
  myPortrait: any = "assets/img/444.png"
  //好友的融云信息
  friendId: any = "188452"
  friendName: any = "他/她"
  friendPortrait: any = "assets/img/11.png"
  public filePath: any; //录音文件的名字
  public recordData: any; //录音对象
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
    private base64: Base64
  ) {
  }
  ngOnInit() {
    //连接融云
    this.connectRongCloud(this.rytoken);
    //进入时间
    this.getNowTime();
  }
  // 现在的时间
  getNowTime() {
    let today = new Date();
    this.friendInfo.time = today.getFullYear() + "/" + today.getMonth() + "/" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes();

  }
  /**滚到底部 */
  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(1);
    }, 100);
  }
  reocrd() {
    if (this.isStart) {
      this.isStart = false;
      this.btntext = "按住 说话"
    } else {
      this.isStart = true;
      this.btntext = "按住 说话"
    }

  }
  startReocrd() {  //开始录音
    console.log("开始录音");
    //文件URL，文件存放在拓展内存卡中文件夹下，命名为Record.mp3
    this.filePath = this.file.externalDataDirectory + "Record.amr";

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
    // this.file.readAsDataURL(this.file.externalDataDirectory,"Record.amr").then((base64File: string) => {
    //   console.log("读取完成");
    //   console.log(JSON.stringify(base64File));
    //   this.sendVoice(base64File.split("base64,")[1]);
    // }, (err) => {
    //   console.log("读取失败");
    //   console.log(err);
    // });
    this.base64.encodeFile(this.filePath).then((base64File: string) => {
      console.log("转换完成");
      console.log(base64File);
      this.sendVoice(base64File.split("base64,")[1]);
    }, (err) => {
      console.log("转换失败");
      console.log(err);
    });
    // this.play();
  }

  playVoice(data) {
    // var audioFile = "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";
    var audioFile = data;
    console.log("开始播放");
    console.log(audioFile);
    // 音频文件长度   
    var duration = audioFile.length / 1024;
    // 预加载
    RongIMLib.RongIMVoice.preLoaded(audioFile, function () {
      // 播放声音
      RongIMLib.RongIMVoice.play(audioFile, duration);
    });
  }
  /**
  * 连接融云
  */
  async connectRongCloud(rytoken) {
    if (this.rongcloud.getCurrentConnectionStatus() != 0) {

      //链接融云服务器
      this.rongcloud.connect(rytoken).then((userId) => {
        // 成功连接融云服务
        console.log('登录成功：' + userId);
        localStorage.setItem("user_id", userId);
        this.myId = localStorage.setItem("user_id", userId);
      }).catch((error) => {
        // 登录失败处理
        console.log('登录聊天服务器失败' + error)
      })
    }

  }
  ionViewWillEnter() {
    this.rongcloud.getMessageList([RongIMLib.ConversationType.PRIVATE], 100);
    // this.rongcloud.getHistoryMessageList(RongIMLib.ConversationType.PRIVATE, this.storageService.read("userid"), null, 20)
    //获取表情列表
    this.faceList = RongIMLib.RongIMEmoji.list;
    console.log(this.faceList);
    //监听选择的定位
    this.activated.queryParams.subscribe((params: Params) => {
      this.locationData = {
        latitude: params['lat'],
        longitude: params['lng'],
        address: params['address'],
        canSend: params['canSend']
      };
    })
    console.log(this.locationData);
    //如果存在 就发送
    if (this.locationData && this.locationData.canSend == "y") {
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
            let msg = {
              connect: messageContent,
              message: RongIMLib.RongIMEmoji.symbolToEmoji(messageContent.content),
              messageType: message.messageType,
              name: messageContent.user.name,
              portrait: messageContent.user.portrait, //头像
              offLineMessage: message.offLineMessage,
              receiptResponse: message.receiptResponse,
              receivedStatus: message.receivedStatus,
              receivedTime: message.receivedTime,
              senderUserId: message.senderUserId,
              sentStatus: message.sent,
              sentTime: message.sentTime,
              targetId: message.targetId,
            }
            this.peapleInfo.push(msg);
            this.scrollToBottom();
            break;
          case RongIMLib.RongIMClient.MessageType.ImageMessage: // 图片消息
            console.log('图片缩略图 base64', messageContent.content);
            console.log('原图 url', messageContent.imageUri);
            let msgimg = {
              connect: messageContent,
              message: messageContent.content,
              imageUri: messageContent.imageUri,
              messageType: message.messageType,
              name: messageContent.user.name,
              portrait: messageContent.user.portrait, //头像
              offLineMessage: message.offLineMessage,
              receiptResponse: message.receiptResponse,
              receivedStatus: message.receivedStatus,
              receivedTime: message.receivedTime,
              senderUserId: message.senderUserId,
              sentStatus: message.sent,
              sentTime: message.sentTime,
              targetId: message.targetId,
            }
            this.peapleInfo.push(msgimg);
            this.scrollToBottom();
            break;
          case RongIMLib.RongIMClient.MessageType.HQVoiceMessage: // 音频消息
            console.log('音频 type ', messageContent.type); // 编解码类型，默认为 aac 音频
            console.log('音频 url', messageContent.remoteUrl); // 播放：<audio src={remoteUrl} />
            console.log('音频 时长', messageContent.duration);
            break;
          case RongIMLib.RongIMClient.MessageType.VoiceMessage:
            // 对声音进行预加载                
            // message.content.content 格式为 AMR 格式的 base64 码
            console.log("语音的源码：", messageContent.content);
            let msgVoice = {
              connect: messageContent,
              message: messageContent.content,
              duration: messageContent.duration,
              messageType: message.messageType,
              name: messageContent.user.name,
              portrait: messageContent.user.portrait, //头像
              offLineMessage: message.offLineMessage,
              receiptResponse: message.receiptResponse,
              receivedStatus: message.receivedStatus,
              receivedTime: message.receivedTime,
              senderUserId: message.senderUserId,
              sentStatus: message.sent,
              sentTime: message.sentTime,
              targetId: message.targetId,
            }
            this.peapleInfo.push(msgVoice);
            this.scrollToBottom();
            break;
          case RongIMLib.RongIMClient.MessageType.LocationMessage:
            // message.content.latiude => 纬度。
            // message.content.longitude => 经度。
            // message.content.content => 位置图片 base64。
            let locimg = {
              connect: messageContent,
              message: messageContent.connect,
              latitude: messageContent.latitude,
              longitude: messageContent.longitude,
              poi: messageContent.poi,
              messageType: message.messageType,
              name: messageContent.user.name,
              portrait: messageContent.user.portrait, //头像
              offLineMessage: message.offLineMessage,
              receiptResponse: message.receiptResponse,
              receivedStatus: message.receivedStatus,
              receivedTime: message.receivedTime,
              senderUserId: message.senderUserId,
              sentStatus: message.sent,
              sentTime: message.sentTime,
              targetId: message.targetId,
            }
            this.peapleInfo.push(locimg);
            this.scrollToBottom();
            break
          case RongIMLib.RongIMClient.MessageType.RichContentMessage: // 富文本(图文)消息
            console.log('文本内容', messageContent.content);
            console.log('图片 base64', messageContent.imageUri);
            console.log('原图 url', messageContent.url);
            break;
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



  //弹出选择礼物模块
  async presentModal() {
    const modal = await this.modalController.create({
      component: GiftComponent,
      showBackdrop: false,
      backdropDismiss: true,
      keyboardClose: true,
      cssClass: "modal-transparent"
    });
    await modal.present();
    //监听销毁的事件
    const { data } = await modal.onDidDismiss(); //获取关闭传回的值
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
  //发送地理位置信息
  sendLocationMsg(locationData) {
    var latitude = locationData.latitude;
    var longitude = locationData.longitude;
    var poi = locationData.address;
    var content = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKE';  // 位置图片 base64
    var user = {
      id: localStorage.getItem("user_id"),
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
    var pushContent = targetId + '发送了一条消息';  // Push 显示内容
    this.rongcloud.sendMessage(conversationType, targetId, msg, pushContent).then((message) => {
      console.log('发送位置消息成功', message);
      var messageContent = message.content;
      let msgimg = {
        connect: messageContent,
        message: messageContent.connect,
        latitude: messageContent.latitude,
        longitude: messageContent.longitude,
        poi: messageContent.poi,
        messageType: message.messageType,
        name: messageContent.user.name,
        portrait: messageContent.user.portrait, //头像
        offLineMessage: message.offLineMessage,
        receiptResponse: message.receiptResponse,
        receivedStatus: message.receivedStatus,
        receivedTime: message.sentTime,
        senderUserId: message.senderUserId,
        sentStatus: message.sent,
        sentTime: message.sentTime,
        targetId: message.targetId,
      }
      this.peapleInfo.push(msgimg);
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
      id: localStorage.getItem("user_id"),
      name: this.myName,
      portrait: this.myPortrait //头像 
    };
    var msg = new RongIMLib.TextMessage({ content: data, user: user });
    var conversationType = RongIMLib.ConversationType.PRIVATE;
    var targetId = this.friendId;  // 目标 Id
    var pushContent = targetId + '发送了一条消息';  // Push 显示内容
    this.rongcloud.sendMessage(conversationType, targetId, msg, pushContent).then((message) => {
      console.log('发送文本消息成功', message);
      var messageContent = message.content;
      let msg = {
        connect: messageContent,
        message: RongIMLib.RongIMEmoji.symbolToEmoji(messageContent.content),
        messageType: message.messageType,
        name: messageContent.user.name,
        portrait: messageContent.user.portrait, //头像
        offLineMessage: message.offLineMessage,
        receiptResponse: message.receiptResponse,
        receivedStatus: message.receivedStatus,
        receivedTime: message.sentTime,
        senderUserId: messageContent.user.id,
        sentStatus: message.sent,
        sentTime: message.sentTime,
        targetId: message.targetId,
      }
      this.peapleInfo.push(msg);
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
      id: localStorage.getItem("user_id"),
      name: this.myName,
      portrait: this.myPortrait //头像 
    };
    var msg = new RongIMLib.VoiceMessage({
      content: data,
      duration: 60, user: user
    });
    var conversationType = RongIMLib.ConversationType.PRIVATE;
    var targetId = this.friendId;  // 目标 Id
    var pushContent = targetId + '发送了一条消息';  // Push 显示内容
    this.rongcloud.sendMessage(conversationType, targetId, msg, pushContent).then((message) => {
      console.log('语音消息成功', message);
      var messageContent = message.content;
      let msg = {
        connect: messageContent,
        message: messageContent.connect,
        duration: messageContent.duration,
        messageType: message.messageType,
        name: messageContent.user.name,
        portrait: messageContent.user.portrait, //头像
        offLineMessage: message.offLineMessage,
        receiptResponse: message.receiptResponse,
        receivedStatus: message.receivedStatus,
        receivedTime: message.sentTime,
        senderUserId: messageContent.user.id,
        sentStatus: message.sent,
        sentTime: message.sentTime,
        targetId: message.targetId,
      }
      this.peapleInfo.push(msg);
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
              var imageUri = 'https://www.rongcloud.cn/images/newVersion/log_wx.png';  // 上传到服务器的 url. 用来展示高清图片
              var user = {
                id: localStorage.getItem("user_id"),
                name: this.myName,
                portrait: this.myPortrait //头像 
              };
              var msg = new RongIMLib.ImageMessage({ content: imageBase64, imageUri: imageUri, user: user });
              var conversationType = RongIMLib.ConversationType.PRIVATE;
              var targetId = this.friendId;  // 目标 Id
              var pushContent = targetId + '发送了一条消息';  // Push 显示内容
              this.rongcloud.sendMessage(conversationType, targetId, msg, pushContent).then((message) => {
                console.log('发送图片消息成功', message);
                var messageContent = message.content;
                let msg = {
                  connect: messageContent,
                  message: messageContent.content,
                  imageUri: messageContent.imageUri,
                  messageType: message.messageType,
                  name: messageContent.user.name,
                  portrait: messageContent.user.portrait, //头像
                  offLineMessage: message.offLineMessage,
                  receiptResponse: message.receiptResponse,
                  receivedStatus: message.receivedStatus,
                  receivedTime: message.sentTime,
                  senderUserId: messageContent.user.id,
                  sentStatus: message.sent,
                  sentTime: message.sentTime,
                  targetId: message.targetId,
                }
                this.peapleInfo.push(msg);
                this.scrollToBottom();
              }).catch((errorCode) => {
                console.log('发送图片消息失败', errorCode);
                alert('发送图片消息失败' + errorCode)
              })
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
              var imageUri = 'https://www.rongcloud.cn/images/newVersion/log_wx.png';  // 上传到服务器的 url. 用来展示高清图片
              var user = {
                id: localStorage.getItem("user_id"),
                name: this.myName,
                portrait: this.myPortrait //头像 
              };
              var msg = new RongIMLib.ImageMessage({ content: imageBase64, imageUri: imageUri, user: user });
              var conversationType = RongIMLib.ConversationType.PRIVATE;
              var targetId = this.friendId;  // 目标 Id
              var pushContent = targetId + '发送了一条消息';  // Push 显示内容
              this.rongcloud.sendMessage(conversationType, targetId, msg, pushContent).then((message) => {
                console.log('发送图片消息成功', message);
                var messageContent = message.content;
                let msg = {
                  connect: messageContent,
                  message: messageContent.content,
                  imageUri: messageContent.imageUri,
                  messageType: message.messageType,
                  name: messageContent.user.name,
                  portrait: messageContent.user.portrait, //头像
                  offLineMessage: message.offLineMessage,
                  receiptResponse: message.receiptResponse,
                  receivedStatus: message.receivedStatus,
                  receivedTime: message.sentTime,
                  senderUserId: messageContent.user.id,
                  sentStatus: message.sent,
                  sentTime: message.sentTime,
                  targetId: message.targetId,
                }
                this.peapleInfo.push(msg);
                this.scrollToBottom();
              }).catch((errorCode) => {
                console.log('发送图片消息失败', errorCode);
                alert('发送图片消息失败' + errorCode)
              })
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
  addBlacklist(friendid) {
    this.presentAlertConfirm();
  }
  async presentAlertConfirm() {
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
            this.showList = false;
            this.nav.navigateBack(['/tabs/tab3']);
          }
        }
      ]
    });
    await alert.present();
  }
  //拉黑
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
}
