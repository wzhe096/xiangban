import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestUrlService {

  constructor() { }
  // commentBaseUrl: string = "http://111.229.198.81";
  // imageBaseUrl:string ="http://111.229.198.81:81/"
  commentBaseUrl: string = "http://192.168.3.23:80";
  imageBaseUrl: string = "http://192.168.3.23:80/"
  // commentBaseUrl: string = "https://api.tgp125.cn";
  // imageBaseUrl: string = "https://api.tgp125.cn/";
  //更新app
  updateAppUrl = "/getLastVersion"
  //获取appKey
  appkeyUrl = "/sj/getAppKey"
  //获取token
  tokenUrl = "/sj/getToken"
  //好友列表
  friendListUrl = "/sj/friendList"
  //黑名单列表
  blackListUrl = "/sj/blackList"
  //拉黑
  addBlackUrl = "/sj/addBlack"
  //移出拉黑
  removeBlackUrl = "/sj/removeBlack"
  //上传图片
  uploadbase64ImgUrl = "/fastdfs/upload/image/base64"
  //上传文件
  uploadFileUrl = "/fastdfs/upload/file/sample"
  //支付
  payUrl = "/pay/jsPay"
  //礼物列表
  giftListUrl = "/gift/giftsList"
  //发送礼物
  sendGiftUrl = "/gift/receiveGiftMsg"
  //登录
  loginUrl = "/v1/auth/login";
  //注册
  registerUrl = "/v1/auth/register";
  messageVerificationUrl = "/v1/auth/message";
  modifyPasswordUrl = "/v1/auth/modifyPassword";
  verificationCodeLoginUrl = "/v1/auth/verificationCodeLogin";
  //用户信息
  userInfoUrl = "/sj/getUserInfo";
  //完善资料
  perfectInformationUrl = "/sj/perfectUserInfo";
}
