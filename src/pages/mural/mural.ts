import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { DateTime } from 'ionic-angular/components/datetime/datetime';
import {Observable} from 'Rxjs/rx';
import { Subscription } from "rxjs/Subscription";


/**
 * Generated class for the MuralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mural',
  templateUrl: 'mural.html',
})
export class MuralPage {

  public alunos : any;
  public mural : any ;
  observableVar: Subscription;
  public ult_atualizacao : String = new Date().toISOString();
  
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private readonly apiProvider: ApiProvider,
    public storage: Storage,
  ) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MuralPage');
  }


  ionViewDidEnter(){
    
        this.atualizaMural();
        this.observableVar = Observable.interval(10000).subscribe(()=>{ this.atualizaMural(); });
    
      }    
    
    ionViewDidLeave(){
        this.observableVar.unsubscribe();
     }
    


  atualizaMural(){
    console.log('atualizaAlunos()')
    this.mural = [];

    this.storage.get('ult_atualizacao').then(obj => { this.ult_atualizacao=obj })

    this.storage.get('alunos').then(obj => { 
      if (!obj){return}
      console.log('obj',obj);
        this.alunos = obj;
        this.alunos.forEach( aluno => {
              this.ult_atualizacao = new Date().toISOString();
              this.storage.set('ult_atualizacao',this.ult_atualizacao);

            this.apiProvider.mural(aluno.cpf, aluno.matricula, res => {
              
              res.mural.forEach(element => {
                this.mural.push(element);
              });
              console.log('this.mural',this.mural);
            })

          })
        
    })

  }


}
