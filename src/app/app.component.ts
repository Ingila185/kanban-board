import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component'; 
import { Divider, DividerModule } from 'primeng/divider';

import { ToDoCardComponent } from './components/to-do-card/to-do-card.component';



import { ImplementingCardComponent } from './components/implementing-card/implementing-card.component'; 
import { DoneCardComponent } from './components/done-card/done-card.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DividerModule, RouterOutlet, MenuBarComponent, ToDoCardComponent, ImplementingCardComponent, DoneCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(){}
  title = 'kanban-board';
  

}



