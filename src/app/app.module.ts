import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import { PrimeiroCadastroComponent } from './primeiro-cadastro/primeiro-cadastro.component';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import { CasamentoComponent } from './casamento/casamento.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConvidadosComponent } from './convidados/convidados.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeDialogComponent } from './home/home-dialog/home-dialog.component';
import { HomeDialogDeleteComponent } from './home/home-dialog-delete/home-dialog-delete.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrimeiroCadastroComponent,
    HomeComponent,
    CasamentoComponent,
    ConvidadosComponent,
    HomeDialogComponent,
    HomeDialogDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule    
  ],
  providers: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
