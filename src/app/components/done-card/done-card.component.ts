import { Component, Input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
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
        this.allDoneItems.set(res.filter(item=> item.status == TaskStates.Done && item.isActive))
      })
  }


@Input() droppedItemFromInProgress :  ItemModel | undefined | null;


//  DONE_ITEMS: Item[] = DONE_ITEMS;
  allDoneItems = signal<ItemModel[] | undefined | null>(null);
  selectedItem = signal<ItemModel | undefined | null>(null);

  onDragStart = output<ItemModel | undefined | null>();

  dragStart(product: ItemModel) {
    this.selectedItem.set(product);
    this.onDragStart.emit(this.selectedItem());

  }

  dragEnd() {
  //  console.log("Drag End" )
  /*  let currentLeftOverItems: Item[] | undefined | null = this.allDoneItems()?.filter((item: Item) => {
      return item.id != this.selectedItem()?.id
    });

   // console.log(currentLeftOverItems)
    this.allDoneItems.set(currentLeftOverItems);
    this.selectedItem.set(null);*/
  }

  drop() {
    let dataToAdd : ItemModel | undefined | null;
    dataToAdd =  this.droppedItemFromInProgress;
   this.allTodoStore.dispatch(updateItem({id: dataToAdd?.id! , status: TaskStates.Done}))

  }

 



}
