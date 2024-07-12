import { CommonModule } from '@angular/common';

import { Component, signal, output, Input, effect, inject, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgForOf } from '@angular/common';
import { TO_DO_ITEMS } from '../../data/todoItems';
import { Item } from '../../interfaces/item';
import { MenuModule } from 'primeng/menu';

import { NewItemComponent } from '../new-item/new-item.component';
import { DragDropModule } from 'primeng/dragdrop';
import { AllItemStore } from '../../SignalStore/all-items.store';
import { getState } from '@ngrx/signals';
import { Signal } from '@ngrx/signals/src/deep-signal';
import { stat } from 'fs';
import { TaskStates } from '../../enums/TaskStates';
import { Store } from '@ngrx/store';
import { ItemModel } from '../../Item/item.model';
import { getAllTodoItems } from '../../Item/item.selectors';
import { loadAllTodos } from '../../Item/item.actions';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-to-do-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, NgFor, NgForOf, DragDropModule, NewItemComponent, MenuModule, ButtonModule],
  templateUrl: './to-do-card.component.html',
  styleUrl: './to-do-card.component.scss',
  providers:[AllItemStore]
})
export class ToDoCardComponent implements OnChanges, OnInit{
  readonly store = inject(AllItemStore);
  items: MenuItem[] | undefined;


  constructor(private allTodoStore : Store<{item: ItemModel[]}>)
  {
      
    effect(() => {
      // 👇 The effect will be re-executed whenever the state changes.
      const state = getState(this.store);
  //    console.log('Items state changed in todo', state.items);
    
    
    
    });

    
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

editItem(id: string, item: ItemModel )
{
  console.log("working")
}
deleteItem(id: string)
{
  console.log("Delete")
}

 ngOnChanges(changes: SimpleChanges): void {

   // console.log(this.store.items())
   this.allTodoStore.select(getAllTodoItems).subscribe((res)=>
    {
      console.log(res)
    })
    
  }

  @Input() droppedItemFromInProgress: Item | undefined | null;

  TO_DO_ITEMS: Item[] = TO_DO_ITEMS;
  onDragStart = output<Item | undefined | null>();

  selectedItem = signal<Item | undefined | null>(null);
  //allItems = signal<Item[] | undefined | null>(TO_DO_ITEMS);

  allItems =  signal<ItemModel[]>(this.store.items());

  isDragging: boolean = false;

  dragStart(item: Item) {

    this.isDragging = true;

    this.selectedItem.set(item);
    this.onDragStart.emit(this.selectedItem());
    //console.log("dragging start", this.selectedItem())  

  }

   dragEnd() {
   /* this.isDragging = false;

      console.log("Drag End in to-do" , this.selectedItem()?.id)
    let currentLeftOverItems: Item[] | undefined | null = this.allItems()?.filter((item: Item) => {
      return item.id != this.selectedItem()?.id

    });

   // console.log(currentLeftOverItems)

    this.allItems.set(currentLeftOverItems);
    this.selectedItem.set(null);
*/


//console.log(this.store.getAllItems());
this.store.updateItemStatus(this.selectedItem()?.id!, TaskStates.InProgress );


  }

  drop() {
   /* console.log("Dropped Item in To-Do", this.droppedItemFromInProgress )

    
    if(this.droppedItemFromInProgress != null || this.droppedItemFromInProgress != undefined)
    {
    let remainingInProgressItems: Item[] | undefined | null = this.allItems();
    remainingInProgressItems?.push(this.droppedItemFromInProgress!);
    this.allItems.set(remainingInProgressItems);
   // console.log("Updated All Items", this.allItems())
  }*/
  }

  displayNewItems($event : Item[])
  {
  //  this.allItems.set($event);  

  //  console.log($event);
    
  
  if($event){

    this.allTodoStore.select(getAllTodoItems).subscribe(res =>{
      this.allItems.set(res.filter((item)=>item.status== TaskStates.ToDo))
      
    })

}
  }


}
