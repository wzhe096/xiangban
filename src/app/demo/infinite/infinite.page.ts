import { Component, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.page.html',
  styleUrls: ['./infinite.page.scss'],
})
export class InfinitePage implements OnInit {

  list:any[]=[]

  constructor() {
    for (let index = 0; index <10; index++) {
      this.list.push(`这是前面第${index}个数据`);
      
    }
   }

  ngOnInit() {
  }

  loadData(event){
   
      setTimeout(() => {
        console.log('Done');
        event.target.complete();
  
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        for (let index = 0; index <10; index++) {
          this.list.push(`这是第${index}个数据`);
          
        }
        if ( this.list.length > 10) {
          event.target.disabled = true;
        }
      }, 500);
    

  }
}
