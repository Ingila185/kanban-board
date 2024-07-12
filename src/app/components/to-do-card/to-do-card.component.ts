import { CommonModule } from '@angular/common';

import { Component, signal, output, Input, effect, inject, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgForOf } from '@angular/common';
import {  MenuModule } from 'primeng/menu';
import { EditItemComponent } from '../../edit-item/edit-item.component';
import { NewItemComponent } from '../new-item/new-item.component';
import { DragDropModule } from 'primeng/dragdrop';
import { TaskStates } from '../../enums/TaskStates';
import { Store } from '@ngrx/store';
import { ItemModel } from '../../Item/item.model';
import { getAllTodoItems } from '../../Item/item.selectors';
import { MenuItem } from 'primeng/api';
import { DeleteItemComponent } from '../../delete-item/delete-item.component';


@Component({
  selector: 'app-to-do-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, EditItemComponent, NgFor, NgForOf, DragDropModule, NewItemComponent,DeleteItemComponent , MenuModule, ButtonModule],
  templateUrl: './to-do-card.component.html',
  styleUrl: './to-do-card.component.scss',
})
export class ToDoCardComponent implements OnChanges, OnInit{
  items: MenuItem[] | undefined;
  @Input() droppedItemFromInProgress: ItemModel | undefined | null;


  constructor(private allTodoStore : Store<{item: ItemModel[]}>)
  {}
  edit: boolean = false;
  delete: boolean = false;

  ngOnInit(): void {

    this.items = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-pencil',
                  command: ()=>{this.edit = true;}

                
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-trash',
                  command: ()=>{ this.delete = true}
                  

              }
          ]
      }
  ];



  

  }


 ngOnChanges(changes: SimpleChanges): void {
   this.allTodoStore.select(getAllTodoItems).subscribe((res)=>
    {
      this.allItems.set(res.filter((item)=>item.status== TaskStates.ToDo && item.isActive))
    })
    
  }
  
  selectedItem = signal<ItemModel | undefined | null>(null);
  //allItems = signal<Item[] | undefined | null>(TO_DO_ITEMS);

  allItems =  signal<ItemModel[]>([]);

  isDragging: boolean = false;

  dragStart(item: ItemModel) {

    this.isDragging = true;

    this.selectedItem.set(item);
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

  displayNewItems($event : ItemModel[])
  {  
  if($event){

    this.allTodoStore.select(getAllTodoItems).subscribe(res =>{
    this.allItems.set(res.filter((item)=>item.status== TaskStates.ToDo && item.isActive))
      
    })

}
  }


}
