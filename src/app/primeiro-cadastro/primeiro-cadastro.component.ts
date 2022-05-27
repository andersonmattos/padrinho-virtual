import { PrimeiroCadastroService } from './services/primeiro-cadastro.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersInterface } from '../login/interface/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primeiro-cadastro',
  templateUrl: './primeiro-cadastro.component.html',
  styleUrls: ['./primeiro-cadastro.component.css']
})
export class PrimeiroCadastroComponent implements OnInit {

  //Declaração de variáveis
  users: UsersInterface[] = [];
  formCadastro: FormGroup = new FormGroup({});
  path: string = "http://localhost:3000/user";  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: PrimeiroCadastroService
  ) { }

  ngOnInit(): void {
    this.formCadastro = this.formBuilder.group({
      email: [null],
      nome: [null],
      senha: [null]
    });
   
    this.service.getUsers().subscribe(usr => this.users = usr);    
  }

  addUser(){
    console.log(this.formCadastro.value.email)
    console.log(this.formCadastro.value.nome)
    console.log(this.formCadastro.value.senha)
  }

}
