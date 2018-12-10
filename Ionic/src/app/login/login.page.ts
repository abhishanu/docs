import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PhoneValidator } from '../phone.validator';

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
    { type: 'required', message: 'You must enter a contact no.'},
    { type: 'length', message: 'Contact no must contain 10 digits'},
    { type: 'pattern', message: 'Contact no should be composed of numbers only.'}
    ],
    'pwd': [
      { type: 'required', message: 'Name is required.'},
      { type: 'minlength', message: 'Password must be composed of min 5 digits.'}
    ]
  };

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginDetails = this.formBuilder.group({
      contact: ['', Validators.length === 10 ],
      pwd: ['value', Validators.required, Validators.minLength(5)]
    });
  }

  login() {
    console.log('Clicked');
    if (this.loginDetails.valid) {
      console.log('Valid Form');
    } else {
      console.log('Invalid Form');
    }
  }

}
