import { Component, OnInit,ViewChild,ViewChildren } from '@angular/core';


@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  @ViewChild("slide",{static: false}) Slides2;

  constructor() { }

  ngOnInit() {
 
  }

  slid(e){
    let currentIndex = this.Slides2.getActiveIndex();//获取当前下标;
    let isend = this.Slides2.isEnd();
    console.log( currentIndex["__zone_symbol__value"]);
    console.log( 
      Object.keys(currentIndex));
    // __zone_symbol__value
      
    
  }

}
