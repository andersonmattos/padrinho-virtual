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
  
  constructor(
    private route: ActivatedRoute
    ,private router: Router
    ,private http: HttpClient    
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
  }

  onClick() {
    //console.log('Entrando na rotina onClick()')
    //console.log('Valor da variável userId: ' + this.userId)        
    this.router.navigate([this.rootPath,this.userId])
  }

  getuserId(): string {
    return this.userId = this.route.snapshot.params['userId'];        
  }

}
