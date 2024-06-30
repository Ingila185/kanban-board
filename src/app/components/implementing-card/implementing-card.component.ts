import { Component, Input, output, signal } from '@angular/core';
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
  styleUrl: './implementing-card.component.scss'
})
export class ImplementingCardComponent {
  @Input() droppedItem: Item  | undefined | null;

  IN_PROGRESS_ITEMS : Item[] = IN_PROGRESS_ITEMS;
  TO_DO_ITEMS : Item[] = TO_DO_ITEMS;

  selectedItem = signal<Item | undefined | null>(null);
  inProgressItems = signal<Item[] | undefined | null>(IN_PROGRESS_ITEMS);

  onDragInProgressStart = output<Item | undefined | null>();

  drop() {
    console.log("Dropped", this.droppedItem )
   let remainingInProgressItems : Item[] | undefined | null = this.inProgressItems();

    remainingInProgressItems?.push(this.droppedItem!);
    this.inProgressItems.set(remainingInProgressItems);
    //console.log("Updated In Progress Items", this.inProgressItems())   

  }

  dragStart(item: Item)
  {
    this.selectedItem.set(item);
    this.onDragInProgressStart.emit(this.selectedItem());
    console.log("dragging start from in-progress" , this.selectedItem())

  }

  dragEnd() {
    console.log("Drag End from in-progress" , this.selectedItem())
    let currentLeftOverItems: Item[] | undefined | null = this.inProgressItems()?.filter((item: Item)=>
      { 
       // console.log(item.id)
       // console.log(this.selectedItem()?.id)
       // console.log(item.id != this.selectedItem()?.id)
        
        return item.id != this.selectedItem()?.id
      
      });
  
    console.log(currentLeftOverItems)
  
    this.inProgressItems.set(currentLeftOverItems);
    this.selectedItem.set(null);
  
  
  }
  

}
