import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { Reviews } from '../../models/reviews';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  reviews: Reviews[] = [];

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.reviewsService.topReviewsByDate().subscribe(data => {
      this.reviews = data;
    });

  }

}
