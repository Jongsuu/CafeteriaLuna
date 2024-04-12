import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const fadeIn = trigger("fadeIn", [
  transition(":enter", [
    style({
      opacity: 0.8,
      transform: "translateY(10%)"
    }),
    animate("500ms ease-out", style({
      opacity: 1,
      transform: "translateY(0)"
    }))
  ])
]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [fadeIn]
})
export class HomeComponent {

}
