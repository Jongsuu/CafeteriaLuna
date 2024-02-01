import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MenuService } from '../menu.service';
import { MenuItem, MenuMoodExtended, MenuSections, MenuType } from '../../interfaces/menu.interface';
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
  breakfastFilteredItems: MenuItem[] = [];
  private coffeeItems: MenuItem[] = [];
  private smoothieItems: MenuItem[] = [];
  private breakfastItems: MenuItem[] = [];

  selectedMood: MenuMoodExtended = "none";
  selectedMenuSections: MenuSections = {
    coffee: true,
    smoothie: true,
    cake: true,
    tea: false,
    breakfast: true
  };
  loadMenu: MenuSections = {
    coffee: false,
    breakfast: true,
    smoothie: false,
    cake: true,
    tea: false
  };

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getMenu().subscribe(response => {
      this.menuItems = response;
      this.coffeeItems = response.filter(item => item.type === "coffee");
      this.smoothieItems = response.filter(item => item.type === "smoothie");
      this.breakfastItems = response.filter(item => item.type === "breakfast");
      if (this.selectedMood !== "none") {
        const mood = this.selectedMood;
        this.showCoffeeItems(this.coffeeItems.filter(item => item.emotion === mood));
        this.showSmoothieItems(this.smoothieItems.filter(item => item.emotion === mood));
        this.showBreakfastItems(this.breakfastItems.filter(item => item.emotion === mood));
      }
      else {
        this.showCoffeeItems(this.coffeeItems);
        this.showSmoothieItems(this.smoothieItems);
        this.showBreakfastItems(this.breakfastItems);
      }
    });
  }

  changeMood(mood: MenuMoodExtended, menuSection: HTMLElement): void {
    menuSection.scrollIntoView({ block: "center", behavior: "smooth" });
    if (this.selectedMood === mood) {
      this.selectedMood = "none";
      this.showCoffeeItems(this.coffeeItems);
      this.showSmoothieItems(this.smoothieItems);
      this.showBreakfastItems(this.breakfastItems);
    }
    else {
      this.selectedMood = mood;
      this.showCoffeeItems(this.coffeeItems.filter(item => item.emotion === mood));
      this.showSmoothieItems(this.smoothieItems.filter(item => item.emotion === mood));
      this.showBreakfastItems(this.breakfastItems.filter(item => item.emotion === mood));
    }
  }

  selectMenuSection(type: MenuType, menuSection: HTMLElement): void {
    menuSection.scrollIntoView({ block: "center", behavior: "smooth" });
    let wasVisible = this.selectedMenuSections[type];
    this.loadMenu.smoothie = false;
    this.loadMenu.coffee = false;
    if (!wasVisible)
      this.selectedMenuSections[type] = !this.selectedMenuSections[type];
    setTimeout(() => {
      if (wasVisible)
        this.selectedMenuSections[type] = false;
      this.loadMenu.coffee = true;
      this.loadMenu.smoothie = true;
    }, 450);
  }

  private async showCoffeeItems(items: MenuItem[]): Promise<void> {
    this.loadMenu.coffee = false;
    setTimeout(() => {
      this.coffeeFilteredItems = items;
      this.loadMenu.coffee = true;
    }, 350);
  }

  private async showSmoothieItems(items: MenuItem[]): Promise<void> {
    this.loadMenu.smoothie = false;
    setTimeout(() => {
      this.smoothieFilteredItems = items;
      this.loadMenu.smoothie = true;
    }, 350);
  }

  private async showBreakfastItems(items: MenuItem[]): Promise<void> {
    this.loadMenu.breakfast = false;
    setTimeout(() => {
      this.breakfastFilteredItems = items;
      this.loadMenu.breakfast = true;
    }, 350);
  }
}
