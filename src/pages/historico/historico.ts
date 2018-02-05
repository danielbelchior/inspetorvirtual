import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';


/**
 * Generated class for the HistoricoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage {

historico : any;
aluno: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,     private readonly apiProvider: ApiProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricoPage');
    console.log('data', this.navParams.data)
    console.log('CPF', this.navParams.get("cpf"))
    console.log('MATRICULA', this.navParams.get("matricula"))

    this.aluno=this.navParams.get("aluno");
    this.apiProvider.histAluno(this.navParams.get("cpf"), this.navParams.get("matricula"), res => {
      this.historico = res.aluno;
      console.log('this.historico',this.historico)
    })


  }

}
