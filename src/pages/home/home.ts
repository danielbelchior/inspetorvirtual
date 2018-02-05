import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { DateTime } from 'ionic-angular/components/datetime/datetime';
import {Observable} from 'Rxjs/rx';
import { Subscription } from "rxjs/Subscription";
import { HistoricoPage } from '../historico/historico';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

public alunos : any;
//public mural : any ;
public ult_atualizacao : String = new Date().toISOString();
observableVar: Subscription;


  constructor(public navCtrl: NavController,
    private readonly apiProvider: ApiProvider,
    private readonly loadingCtrl: LoadingController,
    private readonly toastCtrl: ToastController,
    public storage: Storage,
  ) {


  }

  ionViewDidEnter(){
    this.atualizaAlunos();
    this.observableVar = Observable.interval(10000).subscribe(()=>{ this.atualizaAlunos(); });
  }    

ionViewDidLeave(){
    this.observableVar.unsubscribe();
 }


 hist(cpf:string, matricula:string, aluno:string){
  this.navCtrl.push(HistoricoPage,{cpf:cpf,matricula:matricula,aluno:aluno})
 }
  
  atualizaAlunos(){
    console.log('atualizaAlunos()')
    //this.mural = [];

    this.storage.get('ult_atualizacao').then(obj => { this.ult_atualizacao=obj })

    this.storage.get('alunos').then(obj => { 
      if (!obj){return}
      console.log('obj',obj);

      if (this.alunos){
        console.log('Grava Cache alunos');
        this.storage.set('alunos',this.alunos);
      }

        this.alunos = obj;
        this.alunos.forEach( aluno => {
              this.ult_atualizacao = new Date().toISOString();
              this.storage.set('ult_atualizacao',this.ult_atualizacao);
              this.apiProvider.statusAluno(aluno.cpf, aluno.matricula, res => {
                aluno.status = res.aluno[0];
                console.log('aluno.status',aluno.status)
                if (! aluno.status.tipo){aluno.status.tipo = 'Sem informação'}  
                if (! aluno.status.datahora){aluno.status.datahora = 'Sem informação'}  
                aluno.status.timestamp = Date.now();

                aluno.status.css = 'yellow'
                if (aluno.status.tipo == 'Dentro'){aluno.status.css = 'green'}
                if (aluno.status.tipo == 'Fora'){aluno.status.css = 'red'}

                //this.storage.set('alunos',this.alunos);
                console.log('this.alunos',this.alunos);

              })
            //aluno.status = {} 
    

          })
        
    })

  }

}
