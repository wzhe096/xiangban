import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  public  BMap: any;
  public locationList:any= [{location:"西安北站", 'detail':  "陕西省西安市未央区元朔路"},
  {location: "龙城名苑", detail:  "陕西省西安市雁塔区丈八北路89号"},
  {location: "龙城名苑", detail:  "陕西省西安市雁塔区丈八北路89号"},
  {location: "龙城名苑", detail:  "陕西省西安市雁塔区丈八北路89号"},
      ]
    
  constructor() { }

  ngOnInit() {
  }


//    initMap():void{
//     this.createMap();//创建地图
//     this.setMapEvent();//设置地图事件
// }
// //创建地图函数：
//  createMap(){
//     var map = new this.BMap.Map("BaiduDitu");//在百度地图容器中创建一个地图
//     map.centerAndZoom('上海',11);//设定地图的中心点和坐标并将地图显示在地图容器中
//     window.Map = map;//将map变量存储在全局
// }
// //地图事件设置函数：
//  setMapEvent(){
//     map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
//     map.enableScrollWheelZoom();//启用地图滚轮放大缩小
//     map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
//     map.enableKeyboard();//启用键盘上下左右键移动地图
// }
// $(function(){
//     this.initMap();//创建和初始化地图
//     this.createSearch();
//     this.createAutocomlete();
//     document.getElementById("s_p_search_btn").click(function () {
//         searchPlace(document.getElementById("searchplace").val());
//     });
// });
//  createSearch() {
//     var map = window.Map;
//     var local = new this.BMap.LocalSearch(map,
//         {
//             renderOptions: { map: map, panel: "searchlist" }
//         });
//     window.location = local;
// }
// //搜索
//  searchPlace(value) {
//     window.location.search(value);
// }
//  createAutocomlete() {
//     var map = window.map;
//     var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
//         {
//             "input": "searchplace",
//             "location": map
//         });
//     ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
//         var _value = e.item.value;
//         var addr =_value.business+ _value.province + _value.city + _value.district + _value.street + _value.streetNumber ;
//         this.searchPlace(addr);
//     });
// }
}
