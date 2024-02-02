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

  private coffeeItems: MenuItem[] = [];
  private smoothieItems: MenuItem[] = [];
  private breakfastItems: MenuItem[] = [];
  private cakeItems: MenuItem[] = [];
  private teaItems: MenuItem[] = [];
  coffeeFilteredItems: MenuItem[] = [];
  smoothieFilteredItems: MenuItem[] = [];
  breakfastFilteredItems: MenuItem[] = [];
  cakeFilteredItems: MenuItem[] = [];
  teaFilteredItems: MenuItem[] = [];

  selectedMood: MenuMoodExtended = "none";
  selectedMenuSections: MenuSections = { coffee: true, smoothie: false, cake: false, tea: true, breakfast: true };
  loadMenu: MenuSections = { coffee: false, breakfast: false, smoothie: false, cake: false, tea: false };

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getMenu().subscribe(response => {
      this.coffeeItems = response.filter(item => item.type === "coffee");
      this.smoothieItems = response.filter(item => item.type === "smoothie");
      this.breakfastItems = response.filter(item => item.type === "breakfast");
      this.cakeItems = response.filter(item => item.type === "cake");
      this.teaItems = response.filter(item => item.type === "tea");
      if (this.selectedMood !== "none") {
        const mood = this.selectedMood;
        this.showCoffeeItems(this.coffeeItems.filter(item => item.emotion === mood));
        this.showSmoothieItems(this.smoothieItems.filter(item => item.emotion === mood));
        this.showBreakfastItems(this.breakfastItems.filter(item => item.emotion === mood));
        this.showCakesItems(this.cakeItems.filter(item => item.emotion === mood));
        this.showTeasItems(this.teaItems.filter(item => item.emotion === mood));
      }
      else {
        this.showCoffeeItems(this.coffeeItems);
        this.showSmoothieItems(this.smoothieItems);
        this.showBreakfastItems(this.breakfastItems);
        this.showCakesItems(this.cakeItems);
        this.showTeasItems(this.teaItems);
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
      this.showCakesItems(this.cakeItems);
      this.showTeasItems(this.teaItems);
    }
    else {
      this.selectedMood = mood;
      this.showCoffeeItems(this.coffeeItems.filter(item => item.emotion === mood));
      this.showSmoothieItems(this.smoothieItems.filter(item => item.emotion === mood));
      this.showBreakfastItems(this.breakfastItems.filter(item => item.emotion === mood));
      this.showCakesItems(this.cakeItems.filter(item => item.emotion === mood));
      this.showTeasItems(this.teaItems.filter(item => item.emotion === mood));
    }
  }

  selectMenuSection(type: MenuType, menuSection: HTMLElement): void {
    menuSection.scrollIntoView({ block: "center", behavior: "smooth" });
    let wasVisible = this.selectedMenuSections[type];
    this.loadMenu.coffee = false;
    this.loadMenu.smoothie = false;
    this.loadMenu.breakfast = false;
    this.loadMenu.cake = false;
    this.loadMenu.tea = false;
    if (!wasVisible)
      this.selectedMenuSections[type] = !this.selectedMenuSections[type];
    setTimeout(() => {
      if (wasVisible)
        this.selectedMenuSections[type] = false;
      this.loadMenu.coffee = true;
      this.loadMenu.smoothie = true;
      this.loadMenu.breakfast = true;
      this.loadMenu.cake = true;
      this.loadMenu.tea = true;
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

  private async showCakesItems(items: MenuItem[]): Promise<void> {
    this.loadMenu.cake = false;
    setTimeout(() => {
      this.cakeFilteredItems = items;
      this.loadMenu.cake = true;
    }, 350);
  }

  private async showTeasItems(items: MenuItem[]): Promise<void> {
    this.loadMenu.tea = false;
    setTimeout(() => {
      this.teaFilteredItems = items;
      this.loadMenu.tea = true;
    }, 350);
  }
}
