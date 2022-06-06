import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Variáveis locais
  userId: string = '';
  rootPath: string = '/casamento/';  
  
  constructor(
    private route: ActivatedRoute
    ,private router: Router
  ) { 
    //Busca o id do usuário no endereço da página
    this.userId = this.route.snapshot.params['userId'];
  }

  ngOnInit(): void {
    console.log(this.userId);
  }

  onClick() {
    //console.log('Entrando na rotina onClick()')
    //console.log('Valor da variável userId: ' + this.userId)        
    this.router.navigate([this.rootPath,this.userId])
  }

}
