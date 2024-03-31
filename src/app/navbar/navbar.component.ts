import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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

  scrolled: boolean = false;

  @HostListener("window:scroll", ["$event"])
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
  }
}
