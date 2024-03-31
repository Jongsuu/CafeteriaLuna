import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-carousel-review-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './carousel-review-item.component.html',
  styleUrl: './carousel-review-item.component.css'
})
export class CarouselReviewItemComponent {
  @Input() item: any | undefined;
  starArray = [1, 2, 3, 4, 5];

}
