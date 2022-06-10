import { CasamentoService } from './../casamento/services/casamento.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UsersInterface } from './../login/interface/users';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Variáveis locais
  userId: string = '';
  rootPath: string = '/casamento/';
  userPath: string  = 'http://localhost:3000/user/'
  users: UsersInterface[] = [];
  hasProject: any = 0;
  formNewCasamento: FormGroup = new FormGroup({});
  frm: FormGroup = new FormGroup({});
  casamentoId: string = '';
  existingCasamentoId: string = '';
  
  constructor(
    private route: ActivatedRoute
    ,private router: Router
    ,private http: HttpClient    
    , private formBuilder: FormBuilder
    , private CasamentoService: CasamentoService
  ) { 
    //Busca o id do usuário no endereço da página
    this.userId = this.route.snapshot.params['userId'];
  }

  ngOnInit(): void {
    console.log(this.userId);
    this.http.get<any>(this.userPath+this.userId).subscribe(res => {
      this.hasProject = JSON.parse(res.temCasamento)      
    })
    console.log(this.hasProject)

    this.http.get<any>(this.userPath+this.userId).subscribe(
      res => {this.existingCasamentoId = res.idCasamento} 
    )
    
  }

  onClickEdit() {
    console.log('Entrando na rotina onClickEdit()')
    console.log('Valor da variável rootPath: ' + this.rootPath)        
    this.router.navigate([this.rootPath,this.existingCasamentoId])
  }

  onClickNew() {
    this.formNewCasamento = this.formBuilder.group({
      idUser: this.userId,
      noivo1: [null],
      noivo2: [null]
    })    
    
    this.CasamentoService.addCasamento(this.formNewCasamento).subscribe(      
      res => {        
        this.casamentoId = res.id
        this.updateUser(this.casamentoId)    
        //this.router.navigate([this.rootPath+this.casamentoId])
      }
    )
    
    console.log(this.casamentoId)
    
  }

  getuserId(): string {
    return this.userId = this.route.snapshot.params['userId'];        
  }

  updateUser(idCas:string){
    console.log('Entrou na rotina updateUser')
    
    this.frm = this.formBuilder.group({
      temCasamento: 1,
      idCasamento: idCas
    })
    
    this.CasamentoService.patchUserCasamentoStatus(this.userId, this.frm).subscribe()
    this.router.navigate([this.rootPath+this.userId])
  }

}
