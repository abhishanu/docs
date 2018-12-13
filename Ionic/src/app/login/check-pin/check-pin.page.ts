import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-check-pin',
  templateUrl: './check-pin.page.html',
  styleUrls: ['./check-pin.page.scss'],
})
export class CheckPinPage implements OnInit {
  public enteredPin: String = '';

  constructor(
              private alertCtrl: AlertController,
              private navigate: NavController,
              private commonService: CommonService
             ) { }

  ngOnInit() {
  }

  validatePin() {
    if (this.enteredPin === this.commonService.getAppPin()) {
       this.navigate.navigateForward('home');
    } else {
      this.commonService.presentAlert('You Entered the wrong pin.');
    }
  }

  forgetPin() {
    this.commonService.clearAppPin();
    setTimeout(() => {
      this.navigate.navigateForward('login');
    }, 1000);
  }

}
