import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/app/service/tool.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var BMap: any;
// declare var AMap: any;
@Component({
  selector: 'app-baidu-map',
  templateUrl: './baidu-map.page.html',
  styleUrls: ['./baidu-map.page.scss'],
})
export class BaiduMapPage implements OnInit {
  locationData: any;
  map: any;
  constructor(private tool: ToolService,
    private router: Router,
    private nav: NavController,
    private geolocation: Geolocation) { }

  ngOnInit() {
    // var map = new AMap.Map("map", {
    //   zoom: 11,//级别
    //   center: [116.397428, 39.90923],//中心点坐标
    //   viewMode: '3D'//使用3D视图
    // });
    // this.map = map;
    var map = new BMap.Map("map");
    this.map = map;
    var geolocation = new BMap.Geolocation();
    var geoc = new BMap.Geocoder();
    var location = {
      latitude: 0,
      longitude: 0,
      address: ""
    }
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log('您的位置：' + resp.coords.longitude + ',' + resp.coords.latitude);
      // 百度地图API功能
      var point = new BMap.Point(resp.coords.longitude, resp.coords.latitude);
      this.locationData.latitude = resp.coords.latitude;
      this.locationData.longitude = resp.coords.longitude;
      this.locationData.address = this.getAddress(point, this.locationData);
      map.centerAndZoom(point, 18);
      // map.addControl(new BMap.GeolocationControl());
      map.addControl(new BMap.NavigationControl());
      var mk = new BMap.Marker(point);
      map.addOverlay(mk);
      map.panTo(point);
      console.log(this.locationData);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    map.addEventListener("click", function (e) {
      map.clearOverlays()
      var pt = e.point;
      geoc.getLocation(pt, function (rs) {
        var addComp = rs.addressComponents;
        var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
        location.address = address;
      });
      location.latitude = pt.lat;
      location.longitude = pt.lng;
      var marker = new BMap.Marker(pt);  // 创建标注
      map.addOverlay(marker);               // 将标注添加到地图中
      console.log(location);
    });
    this.locationData = location;
    console.log(this.locationData);
  }
  send() {
    console.log(this.locationData);
    this.nav.navigateBack(['/chat'], {
      queryParams: {
        lat: this.locationData.latitude,
        lng: this.locationData.longitude,
        address: this.locationData.address,
        canSend: "y"
      }
    });
  }
  getAddress(point, data) {
    var geoc = new BMap.Geocoder();
    var address = "";
    geoc.getLocation(point, function (rs) {
      var addComp = rs.addressComponents;
      data.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
    });
    return data;
  }

  getLoaction() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('您的位置：' + resp.coords.longitude + ',' + resp.coords.latitude);
      // 百度地图API功能
      this.map.clearOverlays()
      var point = new BMap.Point(resp.coords.longitude, resp.coords.latitude);
      // var convertor = new BMap.Convertor();
      // var pointArr = [];
      // pointArr.push(point);
      // convertor.translate(pointArr, 3, 5, this.translateCallback.bind(this))
      this.locationData.latitude = resp.coords.latitude;
      this.locationData.longitude = resp.coords.longitude;
      this.locationData.address = this.getAddress(point, this.locationData);
      var mk = new BMap.Marker(point);
      this.map.addOverlay(mk);
      this.map.panTo(point);
      console.log(this.locationData);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  //坐标转换完之后的回调函数
  translateCallback = function (data) {
    if (data.status === 0) {
      var point = data.points[0];
      this.locationData.latitude = point.lat;
      this.locationData.longitude = point.lng;
      this.locationData.address = this.getAddress(point, this.locationData);
      var mk = new BMap.Marker(point);
      this.map.addOverlay(mk);
      this.map.panTo(point);
      console.log(this.locationData);
    }
  }
}
