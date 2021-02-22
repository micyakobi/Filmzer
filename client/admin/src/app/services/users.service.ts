import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { addUser } from '../models/addUser';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private usersUrl = environment.usersUrl;
  private searshURL = environment.userSearch;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.usersUrl);
  }

  getUserById(id: number): Observable<Users> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<Users>(url);
  }

  deleteUser(_id: number): Observable<Users> {
    const url = `${this.usersUrl}/${_id}`;
    return this.http.delete<Users>(url);

  }

  countUsers(count: string): Observable<Users> {
    const url = `${this.usersUrl}/${count}`;
    return this.http.get<Users>(url);
  }

  createUser(newUser: addUser): Observable<addUser> {
    return this.http.post<addUser>(this.usersUrl, newUser);
  }

  updateUser( id:number ,user:addUser):Observable<addUser>{
    const url= `${this.usersUrl}/${id}`;
    return this.http.patch<addUser>(url, user);
  }

  getUserByParam(st:string):Observable<Users[]>{
    const url = `${this.searshURL}/${st}`;
    return this.http.get<Users[]>(url);
  }




}




