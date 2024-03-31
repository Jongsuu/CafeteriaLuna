import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewItem } from '../interfaces/reviews.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private httpClient: HttpClient) { }

  getReviews() {
    return this.httpClient.get<ReviewItem[]>("/assets/reviews.json");
  }
}
