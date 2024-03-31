import { Component, Input } from '@angular/core';
import { MenuItem, MenuType } from '../../interfaces/menu.interface';
import { DraggableCarrouselComponent } from '../draggable-carrousel/draggable-carrousel.component';

@Component({
  selector: 'app-menu-category',
  standalone: true,
  imports: [DraggableCarrouselComponent],
  templateUrl: './menu-category.component.html',
  styleUrl: './menu-category.component.css'
})
export class MenuCategoryComponent {
  @Input() categoryTitle: string = "";
  @Input() filteredItems: MenuItem[] = [];
  @Input() loadMenu: boolean = false;
  @Input() showSection: boolean = true;
  @Input() menuType?: MenuType;
}
