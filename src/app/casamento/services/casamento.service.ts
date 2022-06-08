import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CasamentoService {

  private readonly path ='http://localhost:3000/casamento/';

  constructor(private http: HttpClient) { }

  getPartnerName(id:string){
    console.log('Usando método getPartnerName do service Casamento');
    console.log('Valor do path: '+this.path+id);
    return this.http.get<any>(this.path+id);
  }

}
