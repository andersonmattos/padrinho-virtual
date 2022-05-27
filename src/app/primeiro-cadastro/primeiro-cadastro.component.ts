import { HttpClient } from '@angular/common/http';
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
    private service: PrimeiroCadastroService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.formCadastro = this.formBuilder.group({
      email: [null],
      nome: [null],
      senha: [null],
      temCasamento: 0
    });
   
    this.service.getUsers().subscribe(usr => this.users = usr);    
  }

  //Adiciona usuário ao arquivo json
  addUser(){
    console.log(this.formCadastro.value.email)
    console.log(this.formCadastro.value.nome)
    console.log(this.formCadastro.value.senha)

    this.http.post<any>(this.path,this.formCadastro.value).subscribe(
      res => {
        
        alert("Cadastro criado com sucesso!");
        this.formCadastro.reset();
        this.router.navigate(['']);
      }
    )
  }

}
