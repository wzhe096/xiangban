import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-open-membership',
  templateUrl: './open-membership.page.html',
  styleUrls: ['./open-membership.page.scss'],
})
export class OpenMembershipPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  openMembership(level) {

  }
  async userAgreement() {

  }
}
