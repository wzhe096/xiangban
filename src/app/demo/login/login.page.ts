import { Component, OnInit } from '@angular/core';
import {HttpserviceService} from '../services/httpservice.service'
import axios from '../../../plugins/axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userInfo={
    userName:'',
    pwd:'',
    sex:'1'
  };
  public result: string;

  constructor(public http:HttpserviceService ) { }

  ngOnInit() {
this.login1();
// this.login()
  }
  login(){
    console.log(this.userInfo)
    let api='http://ionic.io';
this.http.get(api).then((response)=>{
  console.log(response)
}).catch((err)=>{
  console.log(err)
})
  }
  login1(){
    axios.get('/general/club/logo/list').then(function(response) {
      // handle success
      console.log(response);
  }).
  catch(function(error) {
      // handle error console.log(error);
  }).then(function() {
      // always executed 
  });
      
  }
  login2(){
    axios({
      
    })
    axios.get('/ionic.io').then(function(response) {
      // handle success
      console.log(response);
  }).
  catch(function(error) {
      // handle error console.log(error);
  }).then(function() {
      // always executed 
  });
      
  }

  update(){
    var api="api/doLogin";
        this.http.Post(api,{
          username:1111,
          password:1111,
        }).then((response:any)=>{
            console.log(response);
            if(response.success){
              console.log(response)
              //1、成功后处理业务逻辑
            }else{  
              alert(response.message);     //toast
            } 
        })
  }
}
