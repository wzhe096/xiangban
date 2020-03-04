import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  platform: string; //平台
  savePath: string; //存储路径
  packageName: string;  //包名
  appVersion: string;  //版本名
  appVersionCode: any; //版本号
  constructor() { }
}
