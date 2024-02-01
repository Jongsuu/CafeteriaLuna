import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MenuService } from '../menu.service';
import { MenuItem, MenuMoodExtended } from '../../interfaces/menu.interface';
import { MenuCategoryComponent } from '../menu-category/menu-category.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MenuCategoryComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  menuItems: MenuItem[] = [];
  coffeeFilteredItems: MenuItem[] = [];
  smoothieFilteredItems: MenuItem[] = [];
  private coffeeItems: MenuItem[] = [];
  private smoothieItems: MenuItem[] = [];

  selectedMood: MenuMoodExtended = "none";
  loadMenu: boolean = false;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getMenu().subscribe(response => {
      this.menuItems = response;
      this.coffeeItems = response.filter(item => item.type === "coffee");
      this.smoothieItems = response.filter(item => item.type === "smoothie");
      if (this.selectedMood !== "none") {
        const mood = this.selectedMood;
        this.showCoffeeItems(this.coffeeItems.filter(item => item.emotion === mood));
        this.showSmoothieItems(this.smoothieItems.filter(item => item.emotion === mood));
      }
      else {
        this.showCoffeeItems(this.coffeeItems);
        this.showSmoothieItems(this.smoothieItems);
      }
    });
  }

  changeMood(mood: MenuMoodExtended, menuSection: HTMLElement): void {
    menuSection.scrollIntoView({ block: "center" });
    if (this.selectedMood === mood) {
      this.selectedMood = "none";
      this.showCoffeeItems(this.coffeeItems);
      this.showSmoothieItems(this.smoothieItems);
    }
    else {
      this.selectedMood = mood;
      this.showCoffeeItems(this.coffeeItems.filter(item => item.emotion === mood));
      this.showSmoothieItems(this.smoothieItems.filter(item => item.emotion === mood));
    }
  }

  private async showCoffeeItems(items: MenuItem[]): Promise<void> {
    this.loadMenu = false;
    setTimeout(() => {
      this.coffeeFilteredItems = items;
      this.loadMenu = true;
    }, 350);
  }

  private async showSmoothieItems(items: MenuItem[]): Promise<void> {
    this.loadMenu = false;
    setTimeout(() => {
      this.smoothieFilteredItems = items;
      this.loadMenu = true;
    }, 350);
  }
}
