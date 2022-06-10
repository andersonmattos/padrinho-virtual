import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ConvidadosInterface } from './../interface/convidados';

@Injectable({
  providedIn: 'root'
})
export class ConvidadosService {

  private readonly inviteePath:string = 'http://localhost:3000/convidados'

  constructor(private http:HttpClient) { }

}
