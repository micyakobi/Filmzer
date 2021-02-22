import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class CountSmallBoxesService {

  private countUUrl=environment.countUsersUrl;
  private countRUrl=environment.countReviewsUrl;
  private countmUrl=environment.countMoviesUrl;
  currentCounter = this.socket.fromEvent<Number>('count');
 

  constructor(private socket: Socket, private http: HttpClient) { }

    countMovies(): Observable<String>{
    return this.http.get<String>(this.countmUrl);
    }
    countReviews(): Observable<String>{
      return this.http.get<String>(this.countRUrl)
    }
    countUsers(): Observable<String>{
      return this.http.get<String>(this.countUUrl)
    }
  
  

}
