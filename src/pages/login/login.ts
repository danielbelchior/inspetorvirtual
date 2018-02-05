import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private readonly apiProvider: ApiProvider,
      private readonly loadingCtrl: LoadingController,
      private readonly toastCtrl: ToastController,
      public storage: Storage,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

 loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: 'Aguarde...'
});

  login(value: any) {


    this.loading.present();
    console.log('value',value)
    this.apiProvider.login(value.cpf,value.celular, data =>  {
      this.loading.dismiss();

      console.log('data2',data);

      if (data.aluno.length == 0){
        const toast = this.toastCtrl.create({  message: 'Cadastro não localizado. Entre em contato com a escola.',  duration: 5000,  position: 'bottom'});
        toast.present();
      }else{

        data.aluno.forEach( aluno => { aluno.status = {} ; aluno.cpf = value.cpf; aluno.celular = value.celular  })

        this.storage.set('session','1').then(() => {
          let login = { cpf: value.cpf, celular: value.celular   };
          this.storage.set('login',login).then(() => {
            this.storage.set('alunos',data.aluno).then(() => {
              window.location.reload();
            })
          })
        })


      }


      

    } )
}

}



