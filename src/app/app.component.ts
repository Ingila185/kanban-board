import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component'; 
import { Divider, DividerModule } from 'primeng/divider';

import { ToDoCardComponent } from './components/to-do-card/to-do-card.component';



import { ImplementingCardComponent } from './components/implementing-card/implementing-card.component'; 
import { DoneCardComponent } from './components/done-card/done-card.component';
import { Item } from './interfaces/item';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DividerModule, RouterOutlet, MenuBarComponent, ToDoCardComponent, ImplementingCardComponent, DoneCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  droppedItemFromTodoToInProgress: Item | undefined | null;
  droppedItemFromInProgressToToDo: Item | undefined | null;
  droppedItemFromDone: Item | undefined | null;


  constructor(){}
  title = 'kanban-board';
  showData(event : Item | undefined | null)
  {
    this.droppedItemFromTodoToInProgress = event;
    
  }

  sendDataToToDoList(event: Item | undefined | null)
  {
    this.droppedItemFromInProgressToToDo = event;
    this.droppedItemFromDone = event;
    

  }

  sendDataBack(event: Item | undefined | null)
  {
    this.droppedItemFromDone = event
  }

}



