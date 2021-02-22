import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddMovieComponent } from '../components/movies/add-movie/add-movie.component'
import { addUser } from '../models/addUser';



@Injectable({
  providedIn: 'root'
})

export class RefreshService {

  private source= new BehaviorSubject(null);
  refreshMovie= this.source.asObservable();

  constructor() { }

  refMovie( user: addUser){
    this.source.next(user);
  }

}
