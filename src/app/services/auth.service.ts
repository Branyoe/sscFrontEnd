import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewUser } from '../models/NewUser';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Token } from '../models/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ruta: string = 'https://api-scc.herokuapp.com/api/auth'

  constructor(private http: HttpClient) { }

  userSignUp (newUser: NewUser) : Observable<Token> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Token>(`${this.ruta}/signup`, newUser, {headers});
  }

  userSignIn (user: User) : Observable<Token> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Token>(`${this.ruta}/signin`, user, {headers});
  }



}

