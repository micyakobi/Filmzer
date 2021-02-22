import { Component, OnInit } from '@angular/core';
import { AddMovie,groupMovie } from 'src/app/models/addMovie';
import { MoviesService} from '../../../services/movies.service';


@Component({
  selector: 'app-groupby',
  templateUrl: './groupby.component.html',
  styleUrls: ['./groupby.component.css']
})
export class GroupbyComponent implements OnInit {
  mov:groupMovie;
  movies:groupMovie;
  movie: any[]=[

  ]

  constructor(private movieservice: MoviesService) { }

  ngOnInit(): void {
    this.load();
  }
  
//'Science Fiction', 'Thriller', 'Crime', 'Action', 'Comedy']
  load(){

    this.movieservice.getMoviesByGenre().subscribe(data=>{
      this.movies=data;

      var movie= data['movies'].map(a=>this.mov=movie);
     
      
      
      // console.log(this.movies);
      // console.log(this.movies.movies);
      
    });


  }


}
