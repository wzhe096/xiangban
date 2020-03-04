import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.page.html',
  styleUrls: ['./evaluate.page.scss'],
})
export class EvaluatePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  changeColor1(){
    console.log(document.getElementsByTagName("span")[0].style.backgroundColor)
    if(document.getElementsByTagName("span")[0].style.backgroundColor=="rgb(242, 242, 242)"){
      console.log("qqqqq")
      document.getElementsByTagName("span")[0].style.backgroundColor="#FCA2F2";
    }else{
      console.log("ww")
      document.getElementsByTagName("span")[0].style.backgroundColor="#F2F2F2";
    }
   
  }
  Click(){}
}
