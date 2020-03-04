import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.page.html',
  styleUrls: ['./extension.page.scss'],
})
export class ExtensionPage implements OnInit {
  user = {
    nickName : '哈哈',
    age : '',
    address : '',
    income : '',
    profession : '',
    profit: 3.33,
    invitationsNumber: 3
  };
  shareShow=false;
  rankingList = [];
  constructor() { }

  ngOnInit() {
    this.queryRankingList();
  }
  showShare(){
this.shareShow=true;
  }
  closeSucess(){
    this.shareShow=false;
  }
  queryRankingList() {
    const rankingList = [];
    const ranking1 = {
      name: '小明',
      invitationsNumber: 3,
      money: 3.33
    };
    const ranking2 = {
      name: '小话',
      invitationsNumber: 7,
      money: 7.33
    };
    rankingList.push(ranking1);
    rankingList.push(ranking2);
    this.rankingList = rankingList;
  }
  backdropclick(event){
    
  }
}
