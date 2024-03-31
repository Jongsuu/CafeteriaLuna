import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import { ReviewItem } from '../../interfaces/reviews.interface';
import { DraggableCarrouselComponent } from "../draggable-carrousel/draggable-carrousel.component";

@Component({
  selector: 'app-reviews',
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
  imports: [DraggableCarrouselComponent]
})
export class ReviewsComponent implements OnInit {

  reviews: ReviewItem[] = [];

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this.reviewsService.getReviews().subscribe(response => {
      this.reviews = response;
    });
  }
}
