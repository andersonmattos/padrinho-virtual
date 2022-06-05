import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PrimeiroCadastroComponent } from './primeiro-cadastro/primeiro-cadastro.component';
import { HomeComponent } from './home/home.component';
import { CasamentoComponent } from './casamento/casamento.component';

const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'primeiro-cadastro', component: PrimeiroCadastroComponent},
  { path:'home/:userId', component: HomeComponent},
  { path:'casamento', component: CasamentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
