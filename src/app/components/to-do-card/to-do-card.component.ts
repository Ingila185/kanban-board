import { Component, Signal, signal, output, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgForOf } from '@angular/common';
import { TO_DO_ITEMS } from '../../data/todoItems';
import { Item } from '../../interfaces/item';
import { DragDropModule } from 'primeng/dragdrop';

@Component({
  selector: 'app-to-do-card',
  standalone: true,
  imports: [CardModule, ButtonModule, NgFor, NgForOf, DragDropModule],
  templateUrl: './to-do-card.component.html',
  styleUrl: './to-do-card.component.scss'
})
export class ToDoCardComponent {
  @Input() droppedItemFromInProgress: Item  | undefined | null;

  TO_DO_ITEMS : Item[] = TO_DO_ITEMS;
  onDragStart = output<Item | undefined | null>();

  selectedItem = signal<Item | undefined | null>(null);
  allItems = signal<Item[] | undefined | null>(TO_DO_ITEMS);

  dragStart(product: Item) {
    this.selectedItem.set(product);
    this.onDragStart.emit(this.selectedItem());
    console.log("dragging start" , this.selectedItem())

}

dragEnd() {
//  console.log("Drag End" , this.selectedItem()?.id)
  let currentLeftOverItems: Item[] | undefined | null = this.allItems()?.filter((item: Item)=>
    {      
      return item.id != this.selectedItem()?.id
    
    });

  console.log(currentLeftOverItems)

  this.allItems.set(currentLeftOverItems);
  this.selectedItem.set(null);


}

drop() {
  //console.log("Dropped", this.droppedItemFromInProgress )
  let remainingInProgressItems : Item[] | undefined | null = this.allItems();
  remainingInProgressItems?.push(this.droppedItemFromInProgress!);
  this.allItems.set(remainingInProgressItems);
  console.log("Updated All Items", this.allItems())   

}

}
