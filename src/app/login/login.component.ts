import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { LoginService } from './services/login.service';
import { UsersInterface } from './interface/users';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Declaraçao de variáveis
  users: UsersInterface[] = [];
  formLogin: FormGroup = new FormGroup({});
  path: string = "http://localhost:3000/user";
  
    
  constructor(
    private service: LoginService, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      usuario: [null],
      senha: [null]
    });

    this.service.getUsers().subscribe(usuarios => this.users = usuarios);
    
  }

  validateLogin(){    
    console.log(this.formLogin.value);     
    this.http.get<any>(this.path)
    .subscribe(
      res => {        
        const user = res.find((a:any)=>{                    
          return a.nome === this.formLogin.value.usuario && a.senha === this.formLogin.value.senha
        });
        if(user){
          this.formLogin.reset();
          this.router.navigate(['/home']);
        }else{
          alert("Login ou senha inválidos");
          this.formLogin.reset();
        }
      }
    )
  }

  
}
