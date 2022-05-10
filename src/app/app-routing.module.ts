import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PrimeiroCadastroComponent } from './primeiro-cadastro/primeiro-cadastro.component';

const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'primeiro-cadastro', component: PrimeiroCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
