import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-button',
  templateUrl: './button.page.html',
  styleUrls: ['./button.page.scss'],
})
export class ButtonPage implements OnInit {

  public list:any=[];
  public peapleInfo:any={
    username:'',
    age:20,
    flag:true,
    payType:'1',
    checkBoxList:[{val:"吃饭",isChecked:true},
  {val:"游戏",isChecked:false},
{val:"学习",isChecked:false}],
cityList:['北京','西安','上海'],
city:'西安'
  }
  constructor(public activated:ActivatedRoute) { }

  ngOnInit() {
    for (let index = 0; index < 10; index++) {
      this.list.push(`这是第${index}条数据`);
      
    }
    this.activated.queryParams.subscribe((data)=>{
          console.log(data)
    })

  }
getInfo(){
console.log(this.peapleInfo)
}

}
