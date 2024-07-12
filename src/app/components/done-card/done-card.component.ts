import { Component, Input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Item } from '../../interfaces/item';
import { DONE_ITEMS } from '../../data/doneItems';
import { NgFor, NgForOf } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';
import { updateItem } from '../../Item/item.actions';
import { TaskStates } from '../../enums/TaskStates';
import { Store } from '@ngrx/store';
import { ItemModel } from '../../Item/item.model';
import { getAllTodoItems } from '../../Item/item.selectors';


@Component({
  selector: 'app-done-card',
  standalone: true,
  imports: [CardModule, ButtonModule, NgFor, NgForOf, DragDropModule],
  templateUrl: './done-card.component.html',
  styleUrl: './done-card.component.scss'
})
export class DoneCardComponent implements OnChanges {
  constructor(private allTodoStore : Store<{item: ItemModel[]}>){}
 
  ngOnChanges(changes: SimpleChanges): void {
    this.allTodoStore.select(getAllTodoItems).subscribe(res=>
      {
        this.allDoneItems.set(res.filter(item=> item.status == TaskStates.Done))
      })
  }


@Input() droppedItemFromInProgress :  Item | undefined | null;


//  DONE_ITEMS: Item[] = DONE_ITEMS;
  allDoneItems = signal<Item[] | undefined | null>(null);
  selectedItem = signal<Item | undefined | null>(null);

  onDragStart = output<Item | undefined | null>();

  dragStart(product: Item) {
    this.selectedItem.set(product);
    this.onDragStart.emit(this.selectedItem());
    console.log("dragging start", product)

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
    let dataToAdd : ItemModel | undefined | null;
    dataToAdd =  this.droppedItemFromInProgress;
   this.allTodoStore.dispatch(updateItem({id: dataToAdd?.id! , status: TaskStates.Done}))

  }

 



}
