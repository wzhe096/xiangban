import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gift-income',
  templateUrl: './gift-income.page.html',
  styleUrls: ['./gift-income.page.scss'],
})
export class GiftIncomePage implements OnInit {

  income = {
    total : 0,
    cashWithdrawal: 0,
    currentRevenue: 0,
    gift: []
  };
  constructor() { }

  ngOnInit() {
    this.queryMyIncome();
  }

  queryMyIncome(){
    const gift1 = {name:'小心心1',number:2,totalMoney:20};
    const gift2 = {name:'小心心2',number:4,totalMoney:40};
    const gift3 = {name:'小心心3',number:6,totalMoney:60};
    const gift = [];
    gift.push(gift1);
    gift.push(gift2);
    gift.push(gift3);
    this.income.gift=gift;
  }
}
