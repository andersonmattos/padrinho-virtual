import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CasamentoService {

  private readonly path ='http://localhost:3000/casamento/';
  private readonly inviteePath ='http://localhost:3000/convidados?idCasamento=';
  private readonly userPath ='http://localhost:3000/user/';

  constructor(private http: HttpClient) { }

  getPartnerName(id:string){
    console.log('getPartnerName - CasamentoService');
    console.log('id:', id)
    console.log(this.path+id);
    return this.http.get<any>(this.path+id);
  }

  updatePartnerName(userId:string, casamentoForm:FormGroup){
    console.log('Usando método updatePartnerName do service Casamento');
    console.log(casamentoForm.value);
    console.log(this.path+userId);    
    
    console.log('Executando patch');
    return this.http.patch<any>(this.path+userId,casamentoForm.value).subscribe(
      res => {
                       
      }
    )
  }

  getInviteesByCasamentoId(casamentoId:string) {    
    return this.http.get<any>(this.inviteePath+casamentoId)
  }

  getCasamentoId(userId:string){
    console.log('Método getCasamentoId: ')
    //return this.http.get<any>(this.userPath+userId)
    return this.http.get<any>(this.path+userId)
  }

  getUserId(userId:string){
    console.log('id',userId)   
    return this.http.get<any>(this.userPath+userId)
  }

  addInviteeByCasamento(idCasamento:string){
    console.log('Usando método addInvitee do service Casamento');   
  }

  addCasamento(formNewCasamento: FormGroup){    
    return this.http.post<any>(this.path, formNewCasamento.value)
  }

  patchUserCasamentoStatus(userId: string, form: FormGroup){
    console.log(form.value)
    return this.http.patch<any>(this.userPath+userId, form.value )
  }
  
  getCasamentoByUserId(casamentoId:string){
    console.log('getCasamentoByUserId')
    this.http.get<any>(this.path+casamentoId).subscribe(
      (res:any)=>{
        const id = res.idUser
        console.log(id)        
      }
    )
  }

  getUserIdByCasamentoId(casamentoId:string){
    //this.http.get<any>('http://localhost:3000/casamento/'+casamentoId)    
    return this.http.get<any>(this.path+casamentoId)
  }

}
