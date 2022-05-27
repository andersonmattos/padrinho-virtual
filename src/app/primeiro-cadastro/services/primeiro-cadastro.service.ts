import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersInterface } from 'src/app/login/interface/users';

@Injectable({
  providedIn: 'root'
})
export class PrimeiroCadastroService {

  private readonly path = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<UsersInterface[]>(this.path)    
  }
}
