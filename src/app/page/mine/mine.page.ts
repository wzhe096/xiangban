import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {
  user = {
    userName: '15332217572',
    nickName: '流水',
    mobile: '15332217572',
    level: '4',
    sex: '1',
    age: '23',
    city: '西安',
    profession: 'it民工',
    income: '1800',
    photos: ['assets\\img\\1.jpg', 'assets\\img\\1.jpg', 'assets\\img\\3.jpg']
  };
  constructor() { }

  ngOnInit() {
  }
  Click(){}
}
