import { Component, Input } from '@angular/core';
import { MenuItem, MenuMood, MenuType } from '../../interfaces/menu.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu-category',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './menu-category.component.html',
  styleUrl: './menu-category.component.css'
})
export class MenuCategoryComponent {
  @Input() categoryTitle: string = "";
  @Input() filteredItems: MenuItem[] = [];
  @Input() loadMenu: boolean = false;
  @Input() showSection: boolean = true;
  @Input() menuType?: MenuType;

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
