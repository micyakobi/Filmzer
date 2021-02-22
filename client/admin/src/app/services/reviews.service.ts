import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reviews } from '../models/reviews';
import { editReviews } from '../models/reviews';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})


export class ReviewsService {

  private latestReviewUrl = environment.latestReviewsUrl;
  private reviewsUrl = environment.reviewsUrl;
  private reviewSearchUrl= environment.reviewSearch;
  private review2Url= environment.reviewUrl2;

  constructor(private http: HttpClient) { }

  getReviews(): Observable<Reviews[]> {
    return this.http.get<Reviews[]>(this.review2Url);
  }
  topReviewsByDate(): Observable<Reviews[]> {
    return this.http.get<Reviews[]>(this.latestReviewUrl)
  }

  deleteReview(_id: number): Observable<Reviews> {
    const url = `${this.reviewsUrl}/${_id}`;
    return this.http.delete<Reviews>(url);

  }

  getReviewById(id: number): Observable<Reviews> {
    const url = `${this.reviewsUrl}/${id}`;
    return this.http.get<Reviews>(url);
  }

  updateReview( id:number ,rev:editReviews):Observable<editReviews>{
    const url= `${this.reviewsUrl}/${id}`;
    return this.http.patch<editReviews>(url, rev);
  }

  getMovieByParam(st:string):Observable<Reviews[]>{
    const url = `${this.reviewSearchUrl}/${st}`;
    console.log(url);
    
    return this.http.get<Reviews[]>(url);
  }



}
