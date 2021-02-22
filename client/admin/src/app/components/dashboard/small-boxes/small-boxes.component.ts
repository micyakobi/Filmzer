import { Component, OnInit } from '@angular/core';
import { CountSmallBoxesService } from '../../../services/count-small-boxes.service'


@Component({
  selector: 'app-small-boxes',
  templateUrl: './small-boxes.component.html',
  styleUrls: ['./small-boxes.component.css']
})
export class SmallBoxesComponent implements OnInit {

  usersView: Number = 0;
  countM: String;
  countU: String;
  countR: String;

  constructor(private service: CountSmallBoxesService) {

    service.currentCounter.subscribe(counter => this.usersView = counter);

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.countMovies().subscribe(data => {
      this.countM = data;
    });

    this.service.countReviews().subscribe(data => {
      this.countR = data;
    });

    this.service.countUsers().subscribe(data => {
      this.countU = data;
    });
  }



}
