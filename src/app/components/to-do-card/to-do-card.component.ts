import { CommonModule } from '@angular/common';

import { Component, Signal, signal, output, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgForOf } from '@angular/common';
import { TO_DO_ITEMS } from '../../data/todoItems';
import { Item } from '../../interfaces/item';
import { NewItemComponent } from '../new-item/new-item.component';
import { DragDropModule } from 'primeng/dragdrop';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-to-do-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, NgFor, NgForOf, DragDropModule, NewItemComponent],
  templateUrl: './to-do-card.component.html',
  styleUrl: './to-do-card.component.scss',
  providers: [ConfirmationService]
})
export class ToDoCardComponent {

  @Input() droppedItemFromInProgress: Item | undefined | null;

  TO_DO_ITEMS: Item[] = TO_DO_ITEMS;
  onDragStart = output<Item | undefined | null>();

  selectedItem = signal<Item | undefined | null>(null);
  allItems = signal<Item[] | undefined | null>(TO_DO_ITEMS);

  isDragging: boolean = false;

  dragStart(item: Item) {
    this.isDragging = true;

    this.selectedItem.set(item);
    this.onDragStart.emit(this.selectedItem());
    console.log("dragging start", this.selectedItem())  

  }

   dragEnd() {
    this.isDragging = false;

      console.log("Drag End in to-do" , this.selectedItem()?.id)
    let currentLeftOverItems: Item[] | undefined | null = this.allItems()?.filter((item: Item) => {
      return item.id != this.selectedItem()?.id

    });

   // console.log(currentLeftOverItems)

    this.allItems.set(currentLeftOverItems);
    this.selectedItem.set(null);


  }

  dropItem() {
    console.log("Dropped Item in To-Do", this.droppedItemFromInProgress )

    
    if(this.droppedItemFromInProgress != null || this.droppedItemFromInProgress != undefined)
    {
    let remainingInProgressItems: Item[] | undefined | null = this.allItems();
    remainingInProgressItems?.push(this.droppedItemFromInProgress!);
    this.allItems.set(remainingInProgressItems);
   // console.log("Updated All Items", this.allItems())
  }
  }

  


}
