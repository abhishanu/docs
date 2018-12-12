import { Injectable } from '@angular/core';

import {Storage } from '@ionic/storage';

import { LoadingController } from '@ionic/angular';

import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private items: Array<{ title: string; note: string}> = [];

  private appPin: String;
  constructor(private storage: Storage, private alertCtrl: AlertController, private loadingController: LoadingController) { }

  public addItemToList(titleName: string , noteValue: string) {
    this.items.push({
      title: titleName,
      note: noteValue
    });
  }

  public getAppPin() {
    return this.appPin;
  }

  public savePin(pin: String) {
    this.appPin = pin;
    this.storage.set('pin', pin);
  }

  public getPin() {
    return this.storage.get('pin').then(res => {
      if (res) {
        this.appPin = res;
      }
    });
  }

  public deleteItemFromList() {
    console.log('Delete request');
  }

  public getList(): Array<{ title: string; note: string}> {
    return this.items;
  }

  async presentAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}
