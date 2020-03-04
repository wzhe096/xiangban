import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.page.html',
  styleUrls: ['./my-wallet.page.scss'],
})
export class MyWalletPage implements OnInit {
  money = "0.00";
  giftList = [{ icon: "assets/icon/1.png", name: '告白气球', number: 2, totalMoney: 20 }, { icon: "assets/icon/2.png", name: '小太阳', number: 2, totalMoney: 20 },
  { icon: "assets/icon/3.png", name: '女王口红', number: 2, totalMoney: 20 }, { icon: "assets/icon/4.png", name: '唯爱', number: 999, totalMoney: 20 }];
  isShow: boolean = false;
  constructor(private router: Router) { }
  ngOnInit() {
  }
  aa() {
    debugger
    console.log(111)
  }
  changeShow() {
    if (this.isShow) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }
}
