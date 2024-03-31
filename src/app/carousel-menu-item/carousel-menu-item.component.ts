import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem, MenuMood } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-carousel-menu-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './carousel-menu-item.component.html',
  styleUrl: './carousel-menu-item.component.css'
})
export class CarouselMenuItemComponent {
  @Input() item: MenuItem | undefined;

  getIcon(emotion: MenuMood): string {
    if (emotion === "happy")
      return "sentiment_very_satisfied";
    else if (emotion === "stressed")
      return "sentiment_stressed";
    else if (emotion === "neutral")
      return "sentiment_neutral";
    else if (emotion === "angry")
      return "sentiment_angry";

    return "mood_bad";
  }
}
