import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { RequestUrlService } from './request-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToolService } from './tool.service';
import { Observable } from 'rxjs';
import qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  constructor(public https: HttpClient,
    private requestUrl: RequestUrlService,
    private tool: ToolService,
    private network: Network,
    // private device: Device,
  ) {

  }
  /**
      * 统一发送请求
      * @param params
      * @returns {Promise<{success: boolean, msg: string}>|Promise<R>}
      */
  public request(params: any): any {
    console.log(JSON.stringify(params));
    //获取设备的uuid
    // let uuid = this.device.uuid ? this.device.uuid : null;
    // let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "zh";
    //判断网络状态
    if (this.network.type == 'none') {
      this.tool.showToast("请检查网络连接情况！");
    } else {
      let requesturl = this.requestUrl.commentBaseUrl + params["url"]
      if (params["url"].indexOf("http") >= 0) {
        requesturl = params["url"]
      }
      console.log("请求路径：" + requesturl.toString());
      if (params["method"] == "post" || params["method"] == "POST") {
        return this.post(requesturl, params["data"])
        // return this.post(requesturl + "?uuid=" + uuid + "&lang=" + lang, params["data"])
      } else {
        return this.get(
          this.requestUrl.commentBaseUrl + params["url"]
        );
      }
    }
  }

  /**
   * get请求
   * @param url 接口地址
   * @param params 参数
   * @returns {Promise<R>|Promise<U>}
   */
  public get(url: string): any {

    return this.https.get(url)
      // .timeout(60000)
      .toPromise()
      .then(this.handleSuccess)
      .catch(err =>
        this.httpErrorFun(err));
  }

  /**
   * post请求
   * @param url 接口地址
   * @param params 参数
   * @returns {Promise<R>|Promise<U>}
   */
  public post(url: string, params: any) {

    return this.https.post(url, params)
      // .timeout(60000)
      .toPromise()
      .then(this.handleSuccess)
      .catch(err =>
        this.httpErrorFun(err));
  }

  /** 对请求错误信息的处理
   * param:  err  any  必填,需要处理的错误信息
   * return:  res  string 处理后的结果
   **/
  public httpErrorFun(err: any): any {
    /* new */
    let res: string = ''; // 处理后的结果 /* new */
    let data: any = err; // 需要处理的值 /* new */
    let status: any = err.status;
    /** 后台有返回错误信息时 */
    if (data.hasOwnProperty('error') && data.hasOwnProperty('message')) { /* new */
      // res = data.message; /* new */
      switch (status) {
        case 200:
          res = "业务异常"
          break;
        case 404:
          res = "请求失败，未找到请求地址!";
        case 500:
          res = "请求失败，服务器出错，请稍后再试!";
        case 0:
          res = "请求失败，请求响应出错!";
        default:
      }
      /** 后台没有返回错误信息只有错误名时 */
    } else if (data.hasOwnProperty('name')) { /* new */
      let errName = data.name;
      /* new */
      /** 请求超时 */
      if (errName == 'TimeoutError') { /* new */
        res = "请求超时";
        /* new */
      }
      /** 后台返回未授权时 */
    } else if (data == "Unauthorization") { /* new */
      res = '您没有权限，请重新登录'
      /* new */
    } else {
      console.log("错误信息" + JSON.stringify(data));
      res = "未知错误";
      /* new */
    }
    console.log(res);

    // return res; /* new */
    return Observable.throw(res);
    /* new */
  }

  /**
   * 处理请求成功
   * @param res
   * @returns {{data: (string|null|((node:any)=>any)}
*/
  private handleSuccess(res: Response) {

    let data = JSON.stringify(res);
    const body = JSON.parse(data);
    console.log("请求回调成功")
    console.log(body);//打印返回的数据
    if (body) {
      return body;
      // return {
      //   data: body.data,
      //   statusText: res.statusText,
      //   status: res.status,
      //   success: true
      // };
    } else {
      // return {
      //   statusText: res.statusText,
      //   status: res.status,
      //   success: true
      // };
    }
  }
}
