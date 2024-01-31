import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, fromEvent, map, startWith } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuComponent } from './menu/menu.component';

const SENTIMENT_STRESSED = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-338 46 46q6 6 14 6t14-6l46-46 18 18q9 9 21 9t21-9q9-9 9-21t-9-21l-46-46q-6-6-14-6t-14 6l-46 46-46-46q-6-6-14-6t-14 6l-46 46-46-46q-6-6-14-6t-14 6l-46 46q-9 9-9 21t9 21q9 9 21 9t21-9l18-18 46 46q6 6 14 6t14-6l46-46ZM339-560l-52 38q-10 8-12.5 20t5.5 22q8 10 20 12.5t22-5.5l97-71q8-6 8-16t-8-16l-97-71q-10-8-22-5.5T280-640q-8 10-6 22t13 20l52 38Zm282 0 52-38q10-8 12.5-20t-5.5-22q-8-10-20-12.5t-22 5.5l-97 71q-8 6-8 16t8 16l97 71q10 8 22 5.5t20-12.5q8-10 6-22t-13-20l-52-38ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"/></svg>`;
const SENTIMENT_ANGRY = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Zm60-364 20-12q2 24 19 40t41 16q25 0 42.5-17.5T680-540q0-15-7-28.5T654-590l26-15-20-35-140 80 20 36Zm-120 0 20-36-140-80-20 35 26 15q-12 8-19 21.5t-7 28.5q0 25 17.5 42.5T340-480q24 0 41-16t19-40l20 12Zm60 84q-71 0-125 45.5T279-280h402q-22-69-76-114.5T480-440Zm0-40Z"/></svg>`;

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MenuComponent
  ]
})
export class AppComponent implements OnInit {
  title = "Cafeteria Luna";
  isDarkMode = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('sentiment_stressed', sanitizer.bypassSecurityTrustHtml(SENTIMENT_STRESSED));
    iconRegistry.addSvgIconLiteral('sentiment_angry', sanitizer.bypassSecurityTrustHtml(SENTIMENT_ANGRY));
  }

  private media(query: string): Observable<boolean> {
    const mediaQuery = window.matchMedia(query);
    return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
      startWith(mediaQuery),
      map((list: MediaQueryList) => list.matches)
    );
  }

  ngOnInit(): void {
    this.media("(prefers-color-scheme: dark)").subscribe((matches) => {
      this.isDarkMode = matches;
    });
  }
}
