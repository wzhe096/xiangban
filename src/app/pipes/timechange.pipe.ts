import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timechange'
})
export class TimechangePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let now = new Date(value);
    let year = now.getFullYear();
    let month: any = now.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let date: any = now.getDate();
    date = date < 10 ? '0' + date : date;
    let hour: any = now.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    let minute: any = now.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    let second = now.getSeconds();
    return year + "/" + month + "/" + date + " " + hour + ":" + minute;
  }

}
