import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-bank-card2',
  templateUrl: './add-bank-card2.page.html',
  styleUrls: ['./add-bank-card2.page.scss'],
})
export class AddBankCard2Page implements OnInit {
bankList:any=['中国农业银行','中国银行'];
bankTypeList:any=['储蓄卡','信用卡'];
  constructor() { }

  ngOnInit() {
  }
  onClick(){}
}
