import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { AddMovie } from '../../../models/addMovie';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})


export class AddMovieComponent implements OnInit {
  
  @Output() upDate = new EventEmitter<string>();

  constructor(private moviesService: MoviesService,
              private rout:Router) { }

  ngOnInit(): void {
  }


  createMovie( titleN: string, yearN: number, genreN: string,descriptionN: string, 
    image_urlN: string, trailer_videoN: string ) {

    const movieNew : AddMovie =({
      title: titleN,
      year: yearN,
      genre: genreN,
      description: descriptionN,
      image_url: image_urlN,
      trailer_video: trailer_videoN

    });

    this.moviesService.createMovie(movieNew).subscribe();
    this.rout.navigate(['/movies']);
    
  }
  

}
