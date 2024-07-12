import { Component, effect, inject, Input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
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
import { Store } from '@ngrx/store';
import { ItemModel } from '../../Item/item.model';
import { updateItem } from '../../Item/item.actions';
import { getAllTodoItems } from '../../Item/item.selectors';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-implementing-card',
  standalone: true,
  imports: [CardModule, ButtonModule, NgFor, NgForOf, DragDropModule, MenuModule],
  templateUrl: './implementing-card.component.html',
  styleUrl: './implementing-card.component.scss',
  providers: [AllItemStore]
})
export class ImplementingCardComponent implements OnChanges, OnInit{
  @Input() droppedItem: Item  | undefined | null;
  @Input() droppedItemFromDone: Item  | undefined | null;
  onDragInProgressStart = output<Item | undefined | null>();


  readonly store = inject(AllItemStore);
  items: MenuItem[] | undefined;

  constructor(private allTodoStore : Store<{item: ItemModel[]}>)
  {
      
  
  }
  ngOnInit(): void {
    this.items = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-pencil',
                  command: ()=>{this.editItem("123", {id: '0', name: "", description: "", status:TaskStates.Done})}
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-trash',
                  command: ()=>{this.deleteItem("123")}

              }
          ]
      }
  ];

  }


  
  ngOnChanges(changes: SimpleChanges): void {
    this.allTodoStore.select(getAllTodoItems).subscribe(res=>
      {
        this.inProgressItems.set(res.filter(item=> item.status == TaskStates.InProgress))
      })


  }
  
  IN_PROGRESS_ITEMS : Item[] = IN_PROGRESS_ITEMS;
  TO_DO_ITEMS : Item[] = TO_DO_ITEMS;

  selectedItem = signal<Item | undefined | null>(null);
  inProgressItems = signal<Item[] | undefined | null>(IN_PROGRESS_ITEMS);


  drop($event:DragEvent) {
  let dataToAdd : Item | undefined | null;
  dataToAdd = (this.droppedItem) ? this.droppedItem : this.droppedItemFromDone;
  this.allTodoStore.dispatch(updateItem({id: dataToAdd?.id! , status: TaskStates.InProgress}))


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
 //   console.log("dragging start from in-progress" , this.selectedItem())

  }

  dragEnd() {
    let currentLeftOverItems: Item[] | undefined | null = this.inProgressItems()?.filter((item: Item)=>
      { 
        return item.id != this.selectedItem()?.id
      });  
    this.inProgressItems.set(currentLeftOverItems);
    this.selectedItem.set(null);
  
  
  }
  
  editItem(id: string, item: ItemModel )
  {
    console.log("working")
  }
  deleteItem(id: string)
  {
    console.log("Delete")
  }
  
}
