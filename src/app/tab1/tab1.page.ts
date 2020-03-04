import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
public isFollow=false;
  
  peapleInfo1: any = [{
    index:0,
    distance: '0.23km',
    age: '23',
    sex: '1',
    job: '学生',
    src:"assets/img/222.png",
    followName:'已关注',
    color:'#999999'
   
  },{
    index:1,
    distance: '0.23km',
    age: '23',
    sex: '1',
    job: '学生',
    src:"assets/img/1313.png",
    followName:'关注',
    color:'#999999'
  },
  {
    index:2,
    distance: '0.8km',
    age: '25',
    sex: '0',
    job: '学生',
    src:"assets/img/boy.jpg",
    followName:'关注'
  }];
  public path: any = "src\assets\img\图层 2 拷贝 2.png";
  public showList;
  
  slideOpts = {
    // initialSlide: 1,
    effect:'flip',//轮播效果
    speed: 100,
    autoplay:true,//是否自动轮播
    loop:true //是否循环轮播
  };
  constructor() {
    this.showList = false
   
    window.localStorage.setItem("peapleInfo1",JSON.stringify(this.peapleInfo1) );

    
  }
  ngOnInit(): void {
    
  }
  toFollow(index){
    event.stopPropagation();
      this.peapleInfo1[index].followName=='已关注'?this.peapleInfo1[index].followName='关注':this.peapleInfo1[index].followName='已关注';
  }
  presentPopover() {
    if (this.showList == true) {
      return this.showList = false;
    } else {
      return this.showList = true;
    }
  }

  showBoy(){
    this.showAll();
    for (var i = 0; i < this.peapleInfo1.length; i++) {
 
      if (this.peapleInfo1[i].gender != '男') {
        this.peapleInfo1.splice(i,2);//删除数组某个数据
      }
      }
  }
  showGirl(){
    this.showAll();
    for (var i = 0; i < this.peapleInfo1.length; i++) {

      if (this.peapleInfo1[i].gender != '女') {
        this.peapleInfo1.splice(i,2);
      }
      }
  }
  showAll(){
    this.peapleInfo1=JSON.parse(window.localStorage.getItem("peapleInfo1")) ;
  }


  
  }
