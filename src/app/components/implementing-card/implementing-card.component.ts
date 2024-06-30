import { Component, Input, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { IN_PROGRESS_ITEMS } from '../../data/inProgressItems';
import { TO_DO_ITEMS } from '../../data/todoItems';
import { Item } from '../../interfaces/item';
import { NgFor, NgForOf } from '@angular/common';

import { DragDropModule } from 'primeng/dragdrop';

@Component({
  selector: 'app-implementing-card',
  standalone: true,
  imports: [CardModule, ButtonModule, NgFor, NgForOf, DragDropModule],
  templateUrl: './implementing-card.component.html',
  styleUrl: './implementing-card.component.css'
})
export class ImplementingCardComponent {
  @Input() droppedItem: Item  | undefined | null;

  IN_PROGRESS_ITEMS : Item[] = IN_PROGRESS_ITEMS;
  inProgressItems = signal<Item[] | undefined | null>(IN_PROGRESS_ITEMS);

  TO_DO_ITEMS : Item[] = TO_DO_ITEMS;


  drop() {
    console.log("Dropped", this.droppedItem )
    IN_PROGRESS_ITEMS.push(this.droppedItem!);
    this.inProgressItems.set(IN_PROGRESS_ITEMS);


    
    console.log("Updated In Progress Items", this.inProgressItems())   

  }

  showData($event: any)
  {
    console.log("Implementing card" , $event)
  }

}
