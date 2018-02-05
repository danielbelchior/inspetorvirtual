import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public storage : Storage) {

  }

  logout() {
    console.log('logout');
    this.storage.clear().then(()=>{              window.location.reload();
    });
}



}
