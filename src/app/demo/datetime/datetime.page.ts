import { Component, OnInit } from '@angular/core';
import sd from 'silly-datetime' ;
@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.page.html',
  styleUrls: ['./datetime.page.scss'],
})
export class DatetimePage implements OnInit {
  public datetime = "";
  public year ;
  customPickerOptions: any;

  constructor() {
    let d = new Date();
    this.year=d.getDate();

    // this.datetime = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate();
    this.datetime=sd.format(d,'YYYY-MM-DD')
    console.log(this.datetime)
    this.customPickerOptions = {
      buttons: [{
        text: '取消',
        handler: () => console.log('Clicked Save!')
      }, {
        text: '保存',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          // return false;
        }
      }]
    }
  }

ngOnInit() {
}
dateChange(e){
   console.log("qqqq")
  console.log(e)


}
}
