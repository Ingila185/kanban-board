import { Component, Input, output, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Item } from '../../interfaces/item';
import { DONE_ITEMS } from '../../data/doneItems';
import { NgFor, NgForOf } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';


@Component({
  selector: 'app-done-card',
  standalone: true,
  imports: [CardModule, ButtonModule, NgFor, NgForOf, DragDropModule],
  templateUrl: './done-card.component.html',
  styleUrl: './done-card.component.scss'
})
export class DoneCardComponent {
@Input() droppedItemFromInProgress :  Item | undefined | null;


  DONE_ITEMS: Item[] = DONE_ITEMS;
  allDoneItems = signal<Item[] | undefined | null>(DONE_ITEMS);
  selectedItem = signal<Item | undefined | null>(null);

  onDragStart = output<Item | undefined | null>();

  dragStart(product: Item) {
    this.selectedItem.set(product);
    this.onDragStart.emit(this.selectedItem());
  //  console.log("dragging start", product)

  }

  dragEnd() {
  //  console.log("Drag End" )
    let currentLeftOverItems: Item[] | undefined | null = this.allDoneItems()?.filter((item: Item) => {
      return item.id != this.selectedItem()?.id
    });

   // console.log(currentLeftOverItems)
    this.allDoneItems.set(currentLeftOverItems);
    this.selectedItem.set(null);
  }

  drop() {
   // console.log("Dropped", this.droppedItemFromInProgress )
    let dataToAdd : Item | undefined | null;
    dataToAdd =  this.droppedItemFromInProgress;
    this.addToDoneItems(dataToAdd);

  }

  
  addToDoneItems(item : Item | undefined | null)
  {
    let remainingInProgressItems : Item[] | undefined | null = this.allDoneItems();
    remainingInProgressItems?.push(item!);
    this.allDoneItems.set(remainingInProgressItems);

  }



}
