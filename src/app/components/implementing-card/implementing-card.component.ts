import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-implementing-card',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './implementing-card.component.html',
  styleUrl: './implementing-card.component.css'
})
export class ImplementingCardComponent {

}
