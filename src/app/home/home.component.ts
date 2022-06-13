import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UsersInterface } from './../login/interface/users';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import { HomeDialogComponent } from './home-dialog/home-dialog.component';
import { CasamentoService } from './../casamento/services/casamento.service';
import { HomeDialogDeleteComponent } from './home-dialog-delete/home-dialog-delete.component';

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
  casamentoPath: string  = 'http://localhost:3000/casamento/'
  users: UsersInterface[] = [];
  hasProject: any = 0;
  formNewCasamento: FormGroup = new FormGroup({});
  frm: FormGroup = new FormGroup({});
  frmPatchCasamento: FormGroup = new FormGroup({});
  frmPatchUser: FormGroup = new FormGroup({});
  casamentoId: string = '';
  existingCasamentoId: string = '';
  
  constructor(
    private route: ActivatedRoute
    ,private router: Router
    ,private http: HttpClient    
    , private formBuilder: FormBuilder
    , private CasamentoService: CasamentoService
    , public dialog: MatDialog    
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

    //console.log(this.existingCasamentoId)
    
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
        this.router.navigate([this.rootPath+this.casamentoId])
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
   
  }

  onClickeDelete(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(HomeDialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {      
      this.http.delete<any>(this.casamentoPath+this.existingCasamentoId).subscribe();
      alert('Casamento deletado com sucesso')
      this.router.navigate(['/home/'+this.userId])  
      window.location.reload();
    });
  }
  
  onClickEnd(enterAnimationDuration: string, exitAnimationDuration: string): void {
    
    this.frmPatchUser = this.formBuilder.group({
      temCasamento: 0,
      idCasamento: 0
    })

    //this.dialog.open(HomeDialogComponent);
    const dialogRef = this.dialog.open(HomeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {      
      this.http.patch<any>(this.casamentoPath+this.existingCasamentoId, {status:0}).subscribe();      
      this.http.patch<any>(this.userPath+this.userId, {temCasamento:0,idCasamento:0}).subscribe();
      alert('Casamento encerrado com sucesso')
      window.location.reload();
    });
  }

}