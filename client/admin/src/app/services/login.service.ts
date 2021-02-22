import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { addUser } from '../models/addUser';
import { Users } from '../models/users';




@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginUrl= environment.loginUrl;

  constructor(private http: HttpClient) { }


  getUserByEmail(email:string):Observable<addUser>{
    const url = `${this.loginUrl}/${email}`;
    return this.http.get<addUser>(url);
  }



}
