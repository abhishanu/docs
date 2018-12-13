import { PhoneValidator } from './../phone.validator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginDetails: FormGroup;
  Userlogin = {contact: '', pwd: ''};

  validation_messages = {
    'contact': [
    { type: 'required', message: 'Please enter a contact no.'},
    { type: 'length', message: 'Contact no must contain 10 digits'},
    { type: 'pattern', message: 'Contact no should be composed of numbers only.'}
    ],
    'pwd': [
      { type: 'required', message: 'Name is required.'},
      { type: 'minlength', message: 'Password must be composed of min 5 digits.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private navigate: NavController,
              private commonService: CommonService)  {
  }

  ngOnInit() {
    this.isPinExists();
    this.createFormValidator();
  }

  createFormValidator() {
    this.loginDetails = this.formBuilder.group({
      contact: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      pwd: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ionViewCanEnter() {
    this.isPinExists();
  }

  isPinExists() {
    if (this.commonService.getAppPin() !== undefined || this.commonService.getAppPin() !== null || this.commonService.getAppPin() === '') {
      console.log('pin existed');
      this.navigate.navigateForward('check-pin');
    }
  }

  login() {
    if (this.loginDetails.valid) {
    this.Userlogin.contact = this.loginDetails.get('contact').value;
      this.presentAlert('Log in successfully with:' + this.Userlogin.contact);
      this.commonService.clearAppPin();
    } else {
      this.presentAlert('Invalid');
      this.commonService.clearAppPin();
    }
  }

  async presentAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      cssClass: 'custom-alert-box',
      message: msg,
      buttons: [{
          text: 'Ok',
          cssClass: 'alert-Buttons',
          handler: () => {
            this.goToCreatePinScreen();
          }
        }
      ]
    });

    await alert.present();
  }

  goToCreatePinScreen() {
    this.navigate.navigateForward('/unlockWithPin');
  }

}
