import { CommonModule } from '@angular/common';

import { Component, signal, Input, effect, inject, OnChanges, SimpleChanges, OnInit, output } from '@angular/core';
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
import { DragItem } from '../../Interfaces/DragItem';
import { updateItem } from '../../Item/item.actions';


@Component({
  selector: 'app-to-do-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, EditItemComponent, NgFor, NgForOf, DragDropModule, NewItemComponent,DeleteItemComponent , MenuModule, ButtonModule],
  templateUrl: './to-do-card.component.html',
  styleUrl: './to-do-card.component.scss',
})
export class ToDoCardComponent implements OnChanges, OnInit{
  items: MenuItem[] | undefined;
  @Input() droppedItemInToDo: DragItem | undefined | null;
  draggingSTartFromTodo = output<DragItem>()

  constructor(private allTodoStore : Store<{item: ItemModel[]}>)
  {}
  edit: boolean = false;
  delete: boolean = false;
  allItems =  signal<ItemModel[]>([]);
  selectedItem : ItemModel | null = null;
  isDragging: boolean = false;

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

  dragStart(item: ItemModel) {
    this.isDragging = true;
    this.selectedItem = item;
    this.draggingSTartFromTodo.emit({item: this.selectedItem, fromComponentId: TaskStates.ToDo})
  }

   dragEnd() {
    this.selectedItem = null;
  }

  drop() {   
    this.allTodoStore.dispatch(updateItem({ id: this.droppedItemInToDo?.item?.id!, status: TaskStates.ToDo }))
  }

  displayNewItems($event : ItemModel[])
  {  
  if($event){

    this.allTodoStore.select(getAllTodoItems).subscribe(res =>{
    this.allItems.set(res.filter((item)=>item.status== TaskStates.ToDo && item.isActive))
      
    })

}
  }
  
  handleCloseDialog($event : boolean)
  {
    this.edit = !$event
    this.delete = !$event
  }

}
