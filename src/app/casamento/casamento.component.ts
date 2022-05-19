import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';

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
  dataSource = ELEMENT_DATA;
  tabIndex: any = [];

  ngOnInit() {

  }

  addRow() {
    const newRow = {"name":"","position":0,"invitees":0, isEdit: true}
    this.dataSource = [newRow, ...this.dataSource];
  }

  removeRow(id: number) {
    this.dataSource = this.dataSource.filter((u) => u.position !== id);
  }

  //Método para identificar quando a aba Convidados está selecionada
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    //console.log('tabChangeEvent => ', tabChangeEvent);
    //console.log('index => ', tabChangeEvent.index);
    this.tabIndex = tabChangeEvent.index;
    
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
    key: "position",
    type: "number",
    label: "Id"
  },
  {
    key: "name",
    type: "string",
    label: "Nome"
  },  
  {
    key: "invitees",
    type: "number",
    label: "Número de convidados"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  }
]


