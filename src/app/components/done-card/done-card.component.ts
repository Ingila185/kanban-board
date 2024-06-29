import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-done-card',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './done-card.component.html',
  styleUrl: './done-card.component.css'
})
export class DoneCardComponent {

}
