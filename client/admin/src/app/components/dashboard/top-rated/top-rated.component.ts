import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { Movies } from '../../../models/movies';
import { ChatService} from '../../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css'],
  providers:[ChatService]
})


export class TopRatedComponent implements OnInit {

  movies: Movies[] = [];

  room='lobby';
  user='Admin';
  messageText:string;
  messageArray:Array<{user:String,message:String}>=[];

  constructor(private moviesService: MoviesService,
              private chatservise:ChatService)
               {
                this.chatservise.newUserJoin().subscribe(data=>this.messageArray.push(data));
                this.chatservise.userLeftRoom().subscribe(data=> this.messageArray.push(data));
                this.chatservise.newMessageRecived().subscribe(data=> this.messageArray.push(data));
               }

  ngOnInit(): void {
    this.load();
    this.join();
    
  }
  
  load() {
    this.moviesService.topMoviesByRating().subscribe(data => {
      this.movies = data;
    });
  }

  join(){
    this.chatservise.joinRoom({user:this.user, room:this.room});
  }
  leave(){
    this.chatservise.leaveRoom({user:this.user, room:this.room});
  }
  sendMessage(){
    this.chatservise.sendMessage({user:this.user, room:this.room, message:this.messageText});
    
  }
 



}
