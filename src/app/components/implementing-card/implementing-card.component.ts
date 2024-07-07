import { Component, effect, inject, Input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { IN_PROGRESS_ITEMS } from '../../data/inProgressItems';
import { TO_DO_ITEMS } from '../../data/todoItems';
import { Item } from '../../interfaces/item';
import { NgFor, NgForOf } from '@angular/common';

import { DragDropModule } from 'primeng/dragdrop';
import { AllItemStore } from '../../SignalStore/all-items.store';
import { TaskStates } from '../../enums/TaskStates';
import { getState } from '@ngrx/signals';

@Component({
  selector: 'app-implementing-card',
  standalone: true,
  imports: [CardModule, ButtonModule, NgFor, NgForOf, DragDropModule],
  templateUrl: './implementing-card.component.html',
  styleUrl: './implementing-card.component.scss',
  providers: [AllItemStore]
})
export class ImplementingCardComponent implements OnChanges{

  
  constructor()
  {
      
    effect(() => {
      // 👇 The effect will be re-executed whenever the state changes.
      const state = getState(this.store);
      console.log('Items state changed', state.items);
    });
  }


  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("changed implementing", this.store.getAllItems())
  }
  @Input() droppedItem: Item  | undefined | null;
  @Input() droppedItemFromDone: Item  | undefined | null;
  onDragInProgressStart = output<Item | undefined | null>();

  readonly store = inject(AllItemStore);


  IN_PROGRESS_ITEMS : Item[] = IN_PROGRESS_ITEMS;
  TO_DO_ITEMS : Item[] = TO_DO_ITEMS;

  selectedItem = signal<Item | undefined | null>(null);
  inProgressItems = signal<Item[] | undefined | null>(IN_PROGRESS_ITEMS);


  drop($event:DragEvent) {

    console.log("Dropped item in Implementing", this.store.items(),
     this.droppedItem , this.droppedItemFromDone)
    let dataToAdd : Item | undefined | null;
    dataToAdd = (this.droppedItem) ? this.droppedItem : this.droppedItemFromDone;
    this.addToInProgressItems(dataToAdd);

    this.store.updateItemStatus(dataToAdd?.id! , TaskStates.InProgress)

    

    console.log(this.store.items());



  }

  addToInProgressItems(item : Item | undefined | null)
  {
    let remainingInProgressItems : Item[] | undefined | null = this.inProgressItems();
    remainingInProgressItems?.push(item!);
    this.inProgressItems.set(remainingInProgressItems);
  
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
  
   // console.log(currentLeftOverItems)
  
    this.inProgressItems.set(currentLeftOverItems);
    this.selectedItem.set(null);
  
  
  }
  

}
