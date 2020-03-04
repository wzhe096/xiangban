import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  public config: any = {
    baseUrl: 'http://localhost:8100/'   //本地测试地址
    // baseUrl: 'http://www.hctx365.cn/'   //远程测试地址
  }
  constructor(public http:HttpClient) { }

  get(api){
return new Promise((resolve,reject)=>{
  this.http.get(api).subscribe((response)=>{
    resolve(response);
  },(err)=>{
    reject(err);
  })
})
  }

  Post(url:String, json:Object) {
    var api = this.config.baseUrl + url;
    return new Promise((resove, reject) => {
      this.http.post(api, json).subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

}
