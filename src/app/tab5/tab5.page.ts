import { Component, OnInit } from '@angular/core';
import {HttpserviceService} from '../demo/services/httpservice.service'

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(public http:HttpserviceService ) { }

  ngOnInit() {
  }
 

}
