//import { HttpModule} from '@angular/http';
import { Injectable } from '@angular/core';
import { Http, Headers ,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

 SERVER_URL : string = 'http://www.dalara.com.br/app/v1/';

  constructor(public http: Http)
  
  {
    console.log('Hello ApiProvider Provider');
  }


    login(cpf: string, celular: string, callback: Function) {
      console.log('ApiProvider','checkLogin');
      
      this.http.get(`${this.SERVER_URL}ws1.php?cpf=${cpf}&celular=${celular}`).map(res => res.json()).subscribe(
        data => {
            console.log(`data.length`, data.aluno.length)
            callback(data);
        },
        err => {
            console.log("Oops!",err);
        }
    );
  }

    statusAluno(cpf: string, matricula: string, callback: Function) {
      console.log('ApiProvider',`statusAluno - ${matricula}`);
      
      this.http.get(`${this.SERVER_URL}ws2.php?cpf=${cpf}&matricula=${matricula}`).map(res => res.json()).subscribe(
        data => {
            callback(data);
        },
        err => {
            console.log("Oops!",err);
        }
    );

  }


  histAluno(cpf: string, matricula: string, callback: Function) {
    console.log('ApiProvider',`histAluno - ${matricula}`);
    
    this.http.get(`${this.SERVER_URL}ws3.php?cpf=${cpf}&matricula=${matricula}`).map(res => res.json()).subscribe(
      data => {
          callback(data);
      },
      err => {
          console.log("Oops!",err);
      }
  );

}

  mural(cpf: string, matricula: string, callback: Function) {
    console.log('ApiProvider',`mural - ${matricula}`);
    
    this.http.get(`${this.SERVER_URL}ws4.php?cpf=${cpf}&matricula=${matricula}`).map(res => res.json()).subscribe(
      data => {
          callback(data);
      },
      err => {
          console.log("Oops!",err);
      }
  );

}

}
