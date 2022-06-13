import { HttpClient } from '@angular/common/http';
import { ConvidadosService } from './../convidados/services/convidados.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';


import { LoginComponent } from './../login/login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InviteeInterface } from './interface/invitee';
import { CasamentoInterface } from './interface/casamento';
import { CasamentoService } from './services/casamento.service';



@Component({
  selector: 'app-casamento',
  templateUrl: './casamento.component.html',
  styleUrls: ['./casamento.component.css']
})
export class CasamentoComponent implements OnInit {

  //Determina as colunas a serem mostradas
  //displayedColumns: string[] = ['position','name', 'invitees', 'edit', 'delete',];
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col)=>col.key);;
  columnsSchema: any = COLUMNS_SCHEMA;

  //Origem dos dados
  //dataSource = new MatTableDataSource<Invitees>(ELEMENT_DATA);
  //dataSource = ELEMENT_DATA;

  //Variáveis locais
  userId: string = '';  
  userIdNumber: number = 0;  
  casamentoId: string = '';  
  rootPath: string = '/home/';
  inviteePath: string = 'http://localhost:3000/convidados/';
  formPartner1: FormGroup = new FormGroup({});
  formPartner2: FormGroup = new FormGroup({});
  formPatchInvitees: FormGroup = new FormGroup({});
  noivo1: CasamentoInterface[] = [];
  noivo2: CasamentoInterface[] = [];
  tabIndex: any = [];
  hadChange1: boolean = false;
  hadChange2: boolean = false;
  dataSource: InviteeInterface[] = [];
  casamento: string = '';
  errorMessage: string = ''

  constructor (
    private loggedUser: LoginComponent
    , private router: ActivatedRoute
    , private route: Router
    , private formBuilder: FormBuilder
    , private service: CasamentoService
    , private InviteeService: ConvidadosService
    , private http:HttpClient
    ) {
      //this.userId = this.router.snapshot.params['userId'];      
      this.casamentoId = this.router.snapshot.params['userId'];      
    }

  ngOnInit() {    
    console.log('ngOnInit - Casamento Component');

    this.formPartner1 = this.formBuilder.group({
      noivo1: [null]      
    });

    this.formPartner2 = this.formBuilder.group({
      noivo2: [null]      
    });

    this.service.getUserIdByCasamentoId(this.casamentoId).subscribe(
      (res:any) => {this.userId = res.idUser;}
    )

    this.service.getUserId(this.userId).subscribe(
      res => {     
        this.service.getPartnerName(this.casamentoId).subscribe(
            (a:any) => {this.noivo1 = a.noivo1; this.noivo2 = a.noivo2;}
         )
        }
    )    

    this.service.getInviteesByCasamentoId(this.casamentoId).subscribe(
      (invitee => {this.dataSource = invitee}))   

  }

  addRow() {
    this.route.navigate(['/convidado'],{queryParams: {idCasamento:this.casamentoId}})
    /*const newRow = {"id":0,"idCasamento":0,"nome":"","quantidade":0, isEdit: true}
    this.dataSource = [newRow, ...this.dataSource];    */
  }

  removeRow(id: number) {
    //debugger
    this.InviteeService.deleteConvidadoById(id.toString()).subscribe();
    alert('Deletado com sucesso');    
    this.dataSource = this.dataSource.filter((u:any) => u.id !== id);
  }

  //Método para identificar quando a aba Convidados está selecionada
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    //console.log('tabChangeEvent => ', tabChangeEvent);
    //console.log('index => ', tabChangeEvent.index);
    this.tabIndex = tabChangeEvent.index;
    
  }

  saveChanges(){
    console.log('Iniciando saveChanges() on casamento.component.ts')
    console.log(this.formPartner1.value)
    console.log(this.formPartner2.value)
    
    //debugger

    if(this.hadChange1 != false || this.hadChange2 != false){      
      if(this.hadChange1 != false){        
        this.service.updatePartnerName(this.casamentoId,this.formPartner1)        
      }

      if(this.hadChange2 != false){
        this.service.updatePartnerName(this.casamentoId,this.formPartner2)        
      }
      alert("Atualizado com sucesso!"); 
    }

  }

  onClickHome() {
    console.log('onClickHome - Casamento Component');
    console.log(this.casamentoId);
    //this.casamentoId = this.router.snapshot.params['userId']; 
    /*this.service.getPartnerName(this.casamentoId).subscribe(
      res => {this.userId = JSON.parse(res.idUser)}
    ) */
    //this.service.getCasamentoByUserId(this.casamentoId)      
    console.log(this.rootPath+this.userId)
    this.route.navigate([this.rootPath,this.userId])
  }

  onChangePartner1() {
    this.hadChange1 = true;
  }

  onChangePartner2() {
    this.hadChange2 = true;
  }

  onEditConvidado(id: number, nome: string, quantidade: number) {
        
    this.formPatchInvitees = this.formBuilder.group({      
      nome: nome,
      quantidade: quantidade
    })
    
    this.InviteeService.patchConvidadoById(id.toString(), this.formPatchInvitees).subscribe()
    alert('Atualizado com sucesso')

  }

  navigate(userId:string){
    console.log('navigate - CasamentoComponent')
    console.log('userId')
    console.log(userId)
    this.route.navigate([this.rootPath+userId])
  }

}

export interface Invitees {
  name: string;
  position: number;
  invitees: number;  
}

const ELEMENT_DATA: Invitees[] = [
  {name: 'Convidado 1', position: 1, invitees: 1},
  {name: 'Convidado 2', position: 2, invitees: 1},
  {name: 'Convidado 3', position: 3, invitees: 1},
  {name: 'Convidado 4', position: 4, invitees: 1},
  {name: 'Convidado 5', position: 5, invitees: 1},
  {name: 'Convidado 6', position: 6, invitees: 1},
  {name: 'Convidado 7', position: 7, invitees: 1}
];

const COLUMNS_SCHEMA = [
  {
    key: "id",
    type: "number",
    label: "Id"
  },    
  {
    key: "nome",
    type: "string",
    label: "Nome convidado"
  },
  {
    key: "quantidade",
    type: "number",
    label: "Quantidade convidados"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  }
]


