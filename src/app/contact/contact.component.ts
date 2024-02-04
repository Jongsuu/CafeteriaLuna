import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ScheduleDay } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  schedule: ScheduleDay[] = [
    {
      weekDay: "Lunes",
      time: "Cerrado"
    },
    {
      weekDay: "Martes",
      time: "8:00 - 13:00 / 15:00 - 20:00"
    },
    {
      weekDay: "Miércoles",
      time: "8:00 - 13:00 / 15:00 - 20:00"
    },
    {
      weekDay: "Jueves",
      time: "8:00 - 13:00 / 15:00 - 20:00"
    },
    {
      weekDay: "Viernes",
      time: "8:00 - 13:00 / 15:00 - 20:00"
    },
    {
      weekDay: "Sábado",
      time: "8:00 - 13:00 / 15:00 - 20:00"
    },
    {
      weekDay: "Domingo",
      time: "8:00 - 13:00 / 15:00 - 20:00"
    }
  ];
}
