import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../models/movies';
import { AddMovie,groupMovie,scrapeM } from '../models/addMovie'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})


export class MoviesService {


  private topRaUrl = environment.topRatedMoviesUrl;
  private moviesUrl = environment.moviesUrl;
  private movieSearchUrl=environment.movieSearch;
  private movieByGenreUrl= environment.movieByGenre;
  private scrapeUrl= environment.scrapMovie;

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movies[]> {
    return this.http.get<Movies[]>(this.moviesUrl);
  }

  topMoviesByRating(): Observable<Movies[]> {
    return this.http.get<Movies[]>(this.topRaUrl);
  }

  deleteMovie(_id: number): Observable<Movies> {
    const url = `${this.moviesUrl}/${_id}`;
    return this.http.delete<Movies>(url);

  }

  createMovie(newMovie: AddMovie): Observable<AddMovie> {
    return this.http.post<AddMovie>(this.moviesUrl, newMovie);
  }

  getMovieById(id: number): Observable<Movies> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movies>(url);
  }

  updateMovie( id:number ,movie:AddMovie):Observable<AddMovie>{
    const url= `${this.moviesUrl}/${id}`;
    return this.http.patch<AddMovie>(url, movie);
  }

  getMovieByParam(st:string):Observable<Movies[]>{
    const url = `${this.movieSearchUrl}/${st}`;
    return this.http.get<Movies[]>(url);
  }

  getMoviesByGenre():Observable<groupMovie>{
    const url = `${this.movieByGenreUrl}`;
    //console.log(url);
    
    return this.http.get<groupMovie>(url);
  }

  scrapeMovies(ur:string): Observable<any>{
    const url = `${this.scrapeUrl}${ur}`;
    console.log(url);
    
    return this.http.get(url);
   
  }


}





