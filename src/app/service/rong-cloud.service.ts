import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { HelperService } from './helper.service';
import { StorageService } from './storage.service';
import { ToolService } from './tool.service';
declare let RongIMLib: any;
declare let RongCloudLibPlugin: any;
@Injectable({
  providedIn: 'root'
})
export class RongCloudService {
  // IM_KEY = 'mgb7ka1nmedmg';//融云官网申请的应用key
  IM_KEY = localStorage.getItem("appkey");//融云官网申请的应用key
  constructor(
    public events: Events,
    private helper: HelperService,
    private storageService: StorageService,
    private tool: ToolService) { }
  /**
       * 注册实例化RongYunIm服务
       * @memberof RongcloudServie
       */
  init() {
    // if (this.helper.isAndroidLow()) {
    //   RongCloudLibPlugin.init({ appKey: this.IM_KEY }, (ret, err) => {
    //     // alert(ret.status);
    //   });
    // } else {
    this.IM_KEY = localStorage.getItem("appkey");
    RongIMLib.RongIMClient.init(this.IM_KEY);
    RongIMLib.RongIMEmoji.init();
    RongIMLib.RongIMVoice.init();
    // }
  }

  /**
   * 链接融云服务器状态回调事件
   * @param 
   * @memberof RongcloudServie
   */
  connectionStatusListener() {
    var that = this;
    // if (this.helper.isAndroidLow()) {
    //   console.log("进入cordova的服务器监听")
    //   RongCloudLibPlugin.setConnectionStatusListener((ret, err) => {
    //     that.onListenerStatus(ret.result.connectionStatus);
    //   });
    // } else {
    console.log("进入web的服务器监听")
    RongIMLib.RongIMClient.setConnectionStatusListener({
      onChanged: function (status) {
        that.onListenerStatus(status);
      }
    });
    // }

  }
  /**
    * 判断连接状态
    * @param 
    * @memberof RongcloudServie
    */
  onListenerStatus(status) {
    switch (status) {
      case RongIMLib.ConnectionStatus.CONNECTED:
        console.log('聊天服务链接成功');
        break;
      case RongIMLib.ConnectionStatus.CONNECTING:
        console.log('正在链接');
        break;
      case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
        console.log('网络不可用, 此时可调用 reconnect 进行重连');
        this.reconnect();
        break;
      case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
        console.log('其他设备登录, 本端被踢');
        break;
      case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
        console.log('域名不正确, 请至开发者后台查看安全域名配置');
        // this.reconnect();
        break;
      case RongIMLib.ConnectionStatus.DISCONNECTED:
        console.log('断开链接');
        // this.reconnect();
        break;
      case RongIMLib.ConnectionStatus.CONNECTION_CLOSED:
        console.log('链接已关闭');
        // this.reconnect();
        // this.connect(this.globalData.rongcloudtoken);
        break;
      default:
        console.log('链接状态为', status);
        break;
    }
  }
  /**
    * 收到消息的监听回掉事件
    * @param 
    * @memberof RongcloudServie
    */
  async receiveMessageListener() {
    // if (this.helper.isAndroidLow()) {
    //   console.log("进入cordova的消息监听")
    //   RongCloudLibPlugin.setOnReceiveMessageListener((ret, err) => {
    //     this.onReceived(ret.result.message);
    //   })
    // } else {
    console.log("进入web的消息监听")
    RongIMLib.RongIMClient.setOnReceiveMessageListener({
      // 接收到的消息
      onReceived: (message) => {
        this.onReceived(message)
      }
    })
    // }

  }

  /**
   * 处理消息 （根据自己实际需求处理）
   * @param message 
   */
  async onReceived(message) {
    if (message) {
      var messageContent = message.content;
      this.events.publish('new:message', message, Date.now());
      // 判断消息类型
      // switch (message.messageType) {
      //   case RongIMLib.RongIMClient.MessageType.TextMessage: // 文字消息
      //     console.log('文字内容', messageContent.content);
      //     this.tool.showToast("收到了消息内容:" + messageContent.content)
      //     break;
      //   case RongIMLib.RongIMClient.MessageType.ImageMessage: // 图片消息
      //     console.log('图片缩略图 base64', messageContent.content);
      //     console.log('原图 url', messageContent.imageUri);
      //     break;
      //   case RongIMLib.RongIMClient.MessageType.HQVoiceMessage: // 音频消息
      //     console.log('音频 type ', messageContent.type); // 编解码类型，默认为 aac 音频
      //     console.log('音频 url', messageContent.remoteUrl); // 播放：<audio src={remoteUrl} />
      //     console.log('音频 时长', messageContent.duration);
      //     break;
      //   case RongIMLib.RongIMClient.MessageType.RichContentMessage: // 富文本(图文)消息
      //     console.log('文本内容', messageContent.content);
      //     console.log('图片 base64', messageContent.imageUri);
      //     console.log('原图 url', messageContent.url);
      //     break;
      //   case RongIMLib.RongIMClient.MessageType.UnknownMessage: // 未知消息
      //     console.log('未知消息, 请检查消息自定义格式是否正确', message);
      //     break;
      //   default:
      //     console.log('收到消息', message);
      //     break;
      // }
      // let msg = JSON.parse(message.content.extra);
      // if (msg) {
      //保存数据
      // this.sqlite.executeSql('INSERT INTO message(userId,title, state, content, sendId, sendTime, msgType, isWarning, referenceId, receivers,isValid,isDeleted,createTime,referenceType,referenceCode) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      //   [this.globalData.userId.toString(), msg.title.toString(), '0', msg.content ? msg.content.toString() : '', msg.sendId.toString(), msg.sendTime.toString(), msg.msgType.toString(), msg.isWarning, msg.referenceId ? msg.referenceId.toString() : '', JSON.stringify(msg.receivers), msg.isValid, msg.isDeleted, new Date().getTime().toString(), msg.referenceType ? msg.referenceType.toString() : '', msg.referenceCode ? msg.referenceCode.toString() : ""]).then(() => {
      //     this.events.publish('message:new', msg);//广播通知有信息
      //   });

      // }
    }

  }



  /**
   * 获取未读消息
   * 此接口必须在init()方法之后，连接融云服务器 connect 之前调用。
   * @param {*} token 传入链接的Token
   * @param {(hasMessage) => {}} successCallback  执行成功后的回掉事件
   * @param {(err) => {}} errorCallback 执行错误后的回掉事件
   * @memberof RongcloudServie
   */
  hasRemoteUnreadMessages(token): Promise<any> {
    return new Promise((resolve, reject) => {
      RongIMLib.RongIMClient.getInstance().hasRemoteUnreadMessages(token, {
        onSuccess: (hasMessage) => {
          resolve(hasMessage)
          console.log('未读消息' + hasMessage)
        },
        onError: (err) => {
          reject(err)
        }
      });
    })
  }

  // 获取未读消息总数
  getUnreadMessageNumber(): Promise<any> {
    return new Promise((resolve, reject) => {
      RongIMLib.RongIMClient.getInstance().getTotalUnreadCount({
        onSuccess: (count) => {
          resolve(count);
        },
        onError: (error) => {
          reject(error)
        }
      });
    })
  }
  /**
   * 发送信息
   */
  sendMessage(conversationtype, targetId, msg, pushContent): Promise<any> {
    return new Promise((resolve, reject) => {
      // if (this.helper.isAndroidLow()) {
      //   RongCloudLibPlugin.sendTextMessage({
      //     conversationType: conversationtype,
      //     targetId: targetId,
      //     text: msg
      //   }, (ret, err) => {
      //     resolve(ret);
      //   })
      // } else {
      RongIMLib.RongIMClient.getInstance().sendMessage(
        conversationtype,
        targetId,
        msg,
        {
          onSuccess: (message) => {
            resolve(message);
          },
          onError: (errorCode) => {
            let info = '';
            switch (errorCode) {
              case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时';
                break;
              case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                info = '在黑名单中，无法向对方发送消息';
                break;
              case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                info = '不在讨论组中';
                break;
              case RongIMLib.ErrorCode.NOT_IN_GROUP:
                info = '不在群组中';
                break;
              case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                info = '不在聊天室中';
                break;
              default:
                info = 'x';
                break;
            }
            reject(info)
          },
        },
        false, pushContent, "", null, null
      );
      // }

    })
  }
  /**
   * 通过融云返回的TokenId链接融云服务器
   * 传入链接的Token
   * @param {*} token
   * @param {(userId) => {}} successCallback  执行成功后的回调事件并得到用户UserId
   * @param {() => {}} tokenIncorrectCallback Token失效事件
   * @param {(errorCode) => {}} errorCallback 执行错误后的回掉事件并放回错误编码
   * @memberof RongcloudServie
   */
  connect(token): Promise<any> {
    return new Promise((resolve, reject) => {
      // if (this.helper.isAndroidLow()) {
      //   RongCloudLibPlugin.connect({
      //     token: token
      //   }, (ret, err) => {
      //     if (ret.status == 'success') {
      //       // alert(ret.result.userId);
      //       resolve(ret.result.userId);
      //     } else {
      //       resolve(ret);
      //     }
      //   })
      // } else {
      console.log('进入融云连接方法')
      RongIMLib.RongIMClient.connect(token, {
        onSuccess: function (userId) {
          console.log('连接成功, 用户 id 为', userId);
          // 连接已成功, 此时可通过 getConversationList 获取会话列表并展示
          resolve(userId);
        },
        onTokenIncorrect: function () {
          console.log('连接失败, 失败原因: token 无效');
        },
        onError: function (errorCode) {
          var info = '';
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '链接超时';
              break;
            case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
              info = '不可接受的协议版本';
              break;
            case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
              info = 'appkey 不正确';
              break;
            case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
              info = '服务器不可用';
              break;
            default:
              info = errorCode;
              break;
          }
          console.log('连接失败, 失败原因: ', info);
          reject(info)
        }
      });
      // }

    })
  }

  getCurrentConnectionStatus() {
    // if (this.helper.isAndroidLow()) {
    //   return RongCloudLibPlugin.getConnectionStatus();
    // } else {
    return RongIMLib.RongIMClient.getInstance().getCurrentConnectionStatus();
    // }

  }
  /**
   * 融云重新连接
   */
  reconnect(): Promise<any> {
    if (this.storageService.sessionRead('rongcloud') == 'yes') {
      // this.loadingService.showLoading('正在重新连接聊天服务器');
      return new Promise((resolve, reject) => {
        // if (this.helper.isAndroidLow()) {
        //   this.connect(this.storageService.read("token"));
        // } else {
        RongIMLib.RongIMClient.reconnect({
          onSuccess: (userId) => {
            console.log("融云重连成功." + userId);
            resolve(userId);
          },
          onTokenIncorrect: () => {
            console.log('token无效');
            reject('token无效');
          },
          onError: (errorCode) => {
            console.log("融云重连失败" + errorCode);
            reject(errorCode);
          }
        }, {
          auto: true,
          url: 'https://cdn.ronghub.com/RongIMLib-2.5.5.js',
          rate: [100, 1000, 3000, 6000, 10000]
        });
        // }

      })
    }
  }
  /**
   * 断开融云连接
   */
  disconnectRy() {
    // if (this.helper.isAndroidLow()) {
    //   // 描述：断开后是否接收 Push
    //   RongCloudLibPlugin.disconnect({ isReceivePush: false }, (ret, err) => {
    //   });
    // } else {
    RongIMLib.RongIMClient.getInstance().disconnect();
    // }

  }
  /**
   * 登出融云
   */
  logoutRy() {
    try {
      // if (this.helper.isAndroidLow()) {
      //   RongCloudLibPlugin.logout((ret, err) => {
      //   });
      // } else {
      RongIMLib.RongIMClient.getInstance().logout();
      // }
    } catch (e) {
      console.log(e)
    }
  }

  /**
 * 获取用户ID
 */
  getUserId() {
    try {
      // if (this.helper.isAndroidLow()) {
      //   RongCloudLibPlugin.getCurrentUserId((ret, err) => {
      //     return ret.result;
      //   });
      // } else {
      return RongIMLib.RongIMClient.getInstance().getCurrentUserId();
      // }
    } catch (e) {
      console.log(e)
    }
  }
  /**
* 获取会话列表
*/
  getMessageList(conversationTypes, count) {
    // 会话列表
    let messagelist = []
    RongIMLib.RongIMClient.getInstance().getConversationList({
      onSuccess: function (list) {
        console.log('获取会话列表成功', list);
        messagelist = list;
      },
      onError: function (error) {
        console.log('获取会话列表失败', error);
      }
    }, conversationTypes, count);
    return messagelist;
  }
  /**
* 获取历史会话列表
*/
  async getHistoryMessageList(conversationType, targetId, timestrap, count) {
    return new Promise((resolve, reject) => {
      // 会话列表
      RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
        onSuccess: function (list, hasMsg) {
          /* 
              list: 获取的历史消息列表
              hasMsg: 是否还有历史消息可以获取
            */
          console.log('获取历史消息成功', list);
          resolve(list);

        },
        onError: function (error) {
          // 请排查：单群聊消息云存储是否开通
          console.log('获取历史消息失败', error);
          reject(error);
        }
      });
    })
  }
}
