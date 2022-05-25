
import { Component, OnInit } from '@angular/core';

import { LoginService } from './services/login.service';
import { UsersInterface } from './interface/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: UsersInterface[] = [];
    
  constructor(private service: LoginService ) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(usuarios => this.users = usuarios);
  }

}
