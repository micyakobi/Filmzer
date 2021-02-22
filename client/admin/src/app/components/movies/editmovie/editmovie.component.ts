import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../../services/movies.service';
import { Movies } from 'src/app/models/movies';
import { AddMovie } from 'src/app/models/addMovie';

@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css']
})



export class EditmovieComponent implements OnInit {
  movie: AddMovie
  movies: Movies;

  constructor(private rout: ActivatedRoute,
    private movieService: MoviesService) { }

  ngOnInit(): void {

    let id = this.rout.snapshot.params['id'];

    this.movieService.getMovieById(id).subscribe(data => {
      this.movies = data;
    });

  }

  updateMovie(titleN: string, yearN: number, genreN: string,descriptionN: string, 
    image_urlN: string, trailer_videoN: string) {

    let id = this.rout.snapshot.params['id'];

    const movieNew: AddMovie = ({
     
      title: titleN,
      year: yearN,
      genre: genreN,
      description: descriptionN,
      image_url: image_urlN,
      trailer_video: trailer_videoN
      
    });

    this.movieService.updateMovie(id, movieNew).subscribe();
    

  }
  alert(){
    alert("Success");
  }

}

