import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
public productName='';
public tab='tab1';
  constructor() { }

  ngOnInit() {
  }
  onSearchChange(){
    console.log(this.productName)
  }
}
