import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  public peapleInfo = {
    checkBoxList: [{val: "发布广告", isChecked: true},
      {val: "蓄意诈骗", isChecked: false},
      {val: "色情传播", isChecked: false},
      {val: "辱骂/骚扰/不文明聊天", isChecked: false},
      {val: "虚假照片/虚假视频", isChecked: false}]
  }
  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }
  onClick(){}


}
