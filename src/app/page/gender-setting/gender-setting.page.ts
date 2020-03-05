import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gender-setting',
  templateUrl: './gender-setting.page.html',
  styleUrls: ['./gender-setting.page.scss'],
})
export class GenderSettingPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  genderSetting(value) {
    localStorage.setItem("sex", value);
    this.router.navigate(['register']);
  }
}
