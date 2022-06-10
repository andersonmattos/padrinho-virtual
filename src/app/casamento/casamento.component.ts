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
  rootPath: string = '/home/';
  formPartner1: FormGroup = new FormGroup({});
  formPartner2: FormGroup = new FormGroup({});
  noivo1: CasamentoInterface[] = [];
  noivo2: CasamentoInterface[] = [];
  tabIndex: any = [];
  hadChange1: boolean = false;
  hadChange2: boolean = false;
  dataSource: InviteeInterface[] = [];
  casamento: string = '';

  constructor (
    private loggedUser: LoginComponent
    , private router: ActivatedRoute
    , private route: Router
    , private formBuilder: FormBuilder
    , private service: CasamentoService
    ) {
      this.userId = this.router.snapshot.params['userId'];       
    }

  ngOnInit() {    
    console.log('ngOnInit - Casamento Component: ' + this.userId);

    this.formPartner1 = this.formBuilder.group({
      noivo1: [null]      
    });

    this.formPartner2 = this.formBuilder.group({
      noivo2: [null]      
    });
    
    this.service.getPartnerName(this.userId).subscribe(
     (a:any) => {this.noivo1 = a.noivo1; this.noivo2 = a.noivo2}
    )

    this.service.getCasamentoId(this.userId).subscribe(
      res => {
        //debugger
        this.casamento = res.idCasamento
        this.service.getInviteesByCasamentoId(this.casamento).subscribe(
            (invitee => {
              this.dataSource = invitee
              //this.dataSource = new MatTableDataSource<InviteeInterface[]>(invitee)
              //console.log(this.dataSource.filteredData)
          }))    
       }
    )    
  }

  addRow() {
    const newRow = {"id":0,"idCasamento":0,"nome":"","quantidade":0, isEdit: true}
    this.dataSource = [newRow, ...this.dataSource];
  }

  removeRow(id: number) {
    //debugger
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
        this.service.updatePartnerName(this.userId,this.formPartner1)        
      }

      if(this.hadChange2 != false){
        this.service.updatePartnerName(this.userId,this.formPartner2)        
      }
      alert("Atualizado com sucesso!"); 
    }

  }

  onClickHome() {
    this.userId = this.router.snapshot.params['userId'];    
    this.route.navigate([this.rootPath, this.userId])
  }

  onChangePartner1() {
    this.hadChange1 = true;
  }

  onChangePartner2() {
    this.hadChange2 = true;
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


