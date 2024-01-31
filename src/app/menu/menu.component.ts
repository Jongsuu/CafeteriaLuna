import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MenuService } from '../menu.service';
import { MenuItem, MenuMood, MenuMoodExtended } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonToggleModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  menuItems: MenuItem[] = [];
  coffeeFilteredItems: MenuItem[] = [];
  private coffeeItems: MenuItem[] = [];

  selectedMood: MenuMoodExtended = "none";
  loadMenu: boolean = false;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getMenu().subscribe(response => {
      this.menuItems = response;
      this.coffeeItems = response.filter(item => item.type === "coffee");
      if (this.selectedMood !== "none") {
        const mood = this.selectedMood;
        this.showCoffeeItems(this.coffeeItems.filter(item => item.emotion === mood));
      }
      else
        this.showCoffeeItems(this.coffeeItems);
    });
  }

  changeMood(mood: MenuMoodExtended, menuSection: HTMLElement): void {
    menuSection.scrollIntoView({ block: "center" });
    if (this.selectedMood === mood) {
      this.selectedMood = "none";
      this.showCoffeeItems(this.coffeeItems);
    }
    else {
      this.selectedMood = mood;
      this.showCoffeeItems(this.coffeeItems.filter(item => item.emotion === mood));
    }
  }

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

  private async showCoffeeItems(items: MenuItem[]): Promise<void> {
    this.loadMenu = false;
    setTimeout(() => {
      this.coffeeFilteredItems = items;
      this.loadMenu = true;
    }, 350);
  }
}
