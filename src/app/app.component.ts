import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component'; 
import { Divider, DividerModule } from 'primeng/divider';
import { ToDoCardComponent } from './components/to-do-card/to-do-card.component';
import { ImplementingCardComponent } from './components/implementing-card/implementing-card.component'; 
import { DoneCardComponent } from './components/done-card/done-card.component';
import { ItemModel } from './Item/item.model';
import { DragItem } from './Interfaces/DragItem';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DividerModule,  RouterOutlet, MenuBarComponent, ToDoCardComponent, ImplementingCardComponent, DoneCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  droppedItemToInProgress: DragItem | undefined;
  droppedItemInToDo: DragItem | undefined | null;
  droppedItemToDone: DragItem | undefined | null;


  constructor(){}
  title = 'kanban-board';
  assignValueToItem(event : DragItem)
  {
    this.droppedItemToInProgress = event
  }

  sendDataToToDoList(event: DragItem | undefined | null)
  {
    this.droppedItemInToDo = event;
    this.droppedItemToDone = event;

  }

  sendDataBack(event: DragItem | undefined | null)
  {
    this.droppedItemToDone = event
  }

}



