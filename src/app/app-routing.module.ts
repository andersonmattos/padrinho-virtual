import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PrimeiroCadastroComponent } from './primeiro-cadastro/primeiro-cadastro.component';
import { HomeComponent } from './home/home.component';
import { CasamentoComponent } from './casamento/casamento.component';
import { ConvidadosComponent } from './convidados/convidados.component';

const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'primeiro-cadastro', component: PrimeiroCadastroComponent},
  { path:'home/:userId', component: HomeComponent},
  { path:'casamento/:userId', component: CasamentoComponent},
  //{ path:'convidado?idCasamento=:idCasamento&:id', component: ConvidadosComponent},
  { path:'convidado', component: ConvidadosComponent},
  //{ path:'convidado/:inviteeId', component: ConvidadosComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
