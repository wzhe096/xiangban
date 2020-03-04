import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(private platform: Platform,
    private network: Network) {
  }

  /**
      * 是否真机环境
      * @return {boolean}
      */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否android6以下
   */
  isAndroidLow():boolean{
    return this.isAndroid();
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }


  /**
  * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
  */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  /**
   * 判断是否有网络
   * @returns {boolean}
   */
  isConnecting(): boolean {
    if (this.getNetworkType() == 'none') {
      //没有网络
    }
    return this.getNetworkType() != 'none';
  }

  /**
    * 获取随机数
    */
  generateMixed(n: number) {
    let res = "";
    var chars = ['2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];//随机数 
    for (var i = 0; i < n; i++) {
      var id = Math.ceil(Math.random() * 31);
      res += chars[id];
    }
    return res;
  }
}
