import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component'; 
import { Divider, DividerModule } from 'primeng/divider';
import { ToDoCardComponent } from './components/to-do-card/to-do-card.component';
import { ImplementingCardComponent } from './components/implementing-card/implementing-card.component'; 
import { DoneCardComponent } from './components/done-card/done-card.component';
import { ItemModel } from './Item/item.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DividerModule, RouterOutlet, MenuBarComponent, ToDoCardComponent, ImplementingCardComponent, DoneCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  droppedItemFromTodoToInProgress: ItemModel | undefined | null;
  droppedItemFromInProgressToToDo: ItemModel | undefined | null;
  droppedItemFromDone: ItemModel | undefined | null;


  constructor(){}
  title = 'kanban-board';
  showData(event : ItemModel | undefined | null)
  {
    console.log("data from todo" , event);

    this.droppedItemFromTodoToInProgress = event;
    
  }

  sendDataToToDoList(event: ItemModel | undefined | null)
  {
    console.log('data from Implementing' , event)
    this.droppedItemFromInProgressToToDo = event;
    //console.log('called' , this.droppedItemFromInProgressToToDo)

    this.droppedItemFromDone = event;

  }

  sendDataBack(event: ItemModel | undefined | null)
  {
    console.log("data from done" , event);

    this.droppedItemFromDone = event
  }

}



