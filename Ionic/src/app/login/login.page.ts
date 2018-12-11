import { PhoneValidator } from './../phone.validator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';

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

  constructor(private formBuilder: FormBuilder, public alertCtrl: AlertController)  {
  }

  ngOnInit() {
    this.loginDetails = this.formBuilder.group({
      contact: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      pwd: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  login() {
    if (this.loginDetails.valid) {
    this.Userlogin.contact = this.loginDetails.get('contact').value;
      this.presentAlert('Log in successfully with:' + this.Userlogin.contact);
       this.loginDetails.setValue({
         contact: '',
         pwd: ''
       });
      this.loginDetails.get('contact').markAsUntouched();
    } else {
      this.presentAlert('Invalid');
    }
  }

  async presentAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
