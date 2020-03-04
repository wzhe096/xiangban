import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-binding-account',
  templateUrl: './binding-account.page.html',
  styleUrls: ['./binding-account.page.scss'],
})
export class BindingAccountPage implements OnInit {
  isShow = false;
  money = 999;
  ErrorShow=true;
   public qq;
  constructor() { }

  ngOnInit() {

  }
  submit() {
    this.isShow = true;
    
  }
  closeSucess(){

  }
  backdropclick(event){

  }
  onClick(){
    
  }
  // $(".password-div input").on("input",function(e)
  aa() {
    //标签为password-div下的input添加oninput事件	
    var number = 6;
    // console.log(this.qq);
    //定义输入最大值	
    // var pw = document.getElementById("password").;
    // var pw = $("input[name = 'password']").val();
    //定义pw为name是password的input框的输入值	
    // var list = $(".password-div ul li");
    //定义list是li	
    // for (var i = 0; i < number; i++) {
    //   //for循环遍历将·放入li标签		
    //   if (pw[i]) {
    //     $(list[i]).text("·");
    //   } else {
    //     $(list[i]).text("");
    //   };
    // };
  };
  // $(".password-div ul").click(function() {
  //   $("input[name = 'password']").val("");
  //   $("#password").focus();
  //   $(".password-div ul li").text("");
  // });


}




