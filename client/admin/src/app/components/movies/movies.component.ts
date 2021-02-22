import { Component, OnInit } from '@angular/core';
import { AddMovie } from 'src/app/models/addMovie';
import { Movies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {

  movies: Movies[] = [];
  movie: Movies;
  tmp = "";
  movieM = "";
  movieC = "";
  movieY = "";
  scrape:string;

  constructor(private moviesService: MoviesService,
    private rout: Router) {
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.moviesService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }

  onDelete(_id: number) {
    this.moviesService.deleteMovie(_id).subscribe(() => {
      this.movie = null;
      this.load();
    });
  }

  editMov(id: number) {
    this.rout.navigate(['/movies', id]);
    //console.log(this.rout.navigate(['/movies', id]));
  }

  searchMovie() {
    this.tmp = this.movieM + "=" + this.movieC + "=" + this.movieY;

    this.moviesService.getMovieByParam(this.tmp).subscribe(data => {
      this.movies = data;
    });
  }

  scrapeMovie(){
    this.moviesService.scrapeMovies(this.scrape).subscribe();
    console.log(this.scrape);
  }





}
