import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reviews } from 'src/app/models/reviews';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: Reviews[] = [];
  review: Reviews;
  tmp = "";
  searchU = "";
  searchT = "";
  searchR = "";

  constructor(private reviewsService: ReviewsService,
    private rout: Router) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.reviewsService.getReviews().subscribe(data => {
      this.reviews = data;
    });

  }

  onDelete(_id: number) {
    this.reviewsService.deleteReview(_id).subscribe(() => {
      this.review = null;
      this.load();
    });
  }

  editRe(id: number) {
    this.rout.navigate(['/reviews', id]);
  }

  searchReview() {
    this.tmp = this.searchT + "=" + this.searchR + "=" + this.searchU;

    this.reviewsService.getMovieByParam(this.tmp).subscribe(data => {
      this.reviews = data;
    });
  }



}