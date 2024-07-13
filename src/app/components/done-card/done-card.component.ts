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
import { DragItem } from '../../Interfaces/DragItem';


@Component({
  selector: 'app-done-card',
  standalone: true,
  imports: [CardModule, ButtonModule, NgFor, NgForOf, DragDropModule],
  templateUrl: './done-card.component.html',
  styleUrl: './done-card.component.scss'
})
export class DoneCardComponent implements OnChanges {
  constructor(private allTodoStore : Store<{item: ItemModel[]}>){}
  @Input() droppedItemToDone :  DragItem | undefined | null;
  selectedItem : ItemModel | null = null;
  onDragStart = output<DragItem>();

 

//  DONE_ITEMS: Item[] = DONE_ITEMS;
  allDoneItems = signal<ItemModel[] | undefined | null>(null);


  dragStart(item: ItemModel) {
    
    this.selectedItem = item;
    this.onDragStart.emit({item: this.selectedItem, fromComponentId: TaskStates.Done});

  }

  dragEnd() {
 }

  drop() {
    //Update status to Done 
    this.allTodoStore.dispatch(updateItem({ id: this.droppedItemToDone?.item?.id!, status: TaskStates.Done }))
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.allTodoStore.select(getAllTodoItems).subscribe(res=>
      {
        this.allDoneItems.set(res.filter(item=> item.status == TaskStates.Done && item.isActive))
      })
  }
 



}
