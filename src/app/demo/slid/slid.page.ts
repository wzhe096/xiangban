import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-slid',
  templateUrl: './slid.page.html',
  styleUrls: ['./slid.page.scss'],
})
export class SlidPage implements OnInit {

  @ViewChild('slide2',{static: false}) slide2;

  slideOpts = {
    // initialSlide: 1,
    effect:'flip',//轮播效果
    speed: 100,
    autoplay:true,//是否自动轮播
    loop:true //是否循环轮播
  };

  constructor() { }

  ngOnInit() {
  }
getNext(){
  this.slide2.slideNext();
}
}
