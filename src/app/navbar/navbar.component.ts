import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() isMobile = false;
  @Output() navMenuOpenChange = new EventEmitter<boolean>();

  links = [
    {
      name: "Inicio",
      href: "#"
    },
    {
      name: "Menú",
      href: "#menu"
    },
    {
      name: "Reseñas",
      href: "#reseñas"
    },
    {
      name: "Encuéntranos",
      href: "#encuentranos"
    }
  ];

  scrolled = false;
  @Input() navMenuOpen = false;

  @HostListener("window:scroll", ["$event"])
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
  }

  openNavMenu(): void {
    if (!this.navMenuOpen)
      this.toggleNavMenu(true);
  }

  closeNavMenu(): void {
    if (this.navMenuOpen)
      this.toggleNavMenu(false);
  }

  private toggleNavMenu(enable: boolean): void {
    this.navMenuOpen = enable;
    setTimeout(() => {
      this.navMenuOpenChange.emit(this.navMenuOpen);
    });
  }
}
