import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';//导入接收来自modal页面传递的值

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(public navParams: NavParams) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(this.navParams);
  }

  ngOnInit() {}
  login(){
    console.log("登录成功")
  }
  doClose(){
    console.log("登录关闭")
    this.navParams.data.modal.dismiss();
  }
}
