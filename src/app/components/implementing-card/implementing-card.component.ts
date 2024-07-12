import { Component, effect, inject, Input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgForOf } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';
import { TaskStates } from '../../enums/TaskStates';
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
})
export class ImplementingCardComponent implements OnChanges, OnInit{
  @Input() droppedItem: ItemModel  | undefined | null;
  @Input() droppedItemFromDone: ItemModel  | undefined | null;
  onDragInProgressStart = output<ItemModel | undefined | null>();


  items: MenuItem[] | undefined;
  edit: boolean = false;
  delete: boolean = false;


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
                  command: ()=>{this.edit = true}
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-trash',
                  command: ()=>{this.delete = true}

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
  
  selectedItem = signal<ItemModel | undefined | null>(null);
  inProgressItems = signal<ItemModel[] | undefined | null>([]);


  drop($event:DragEvent) {
  let dataToAdd : ItemModel | undefined | null;
  dataToAdd = (this.droppedItem) ? this.droppedItem : this.droppedItemFromDone;
  this.allTodoStore.dispatch(updateItem({id: dataToAdd?.id! , status: TaskStates.InProgress}))


  }

  addToInProgressItems(item : ItemModel | undefined | null)
  {
    let remainingInProgressItems : ItemModel[] | undefined | null = this.inProgressItems();
    remainingInProgressItems?.push(item!);
    this.inProgressItems.set(remainingInProgressItems);
  
  }

  dragStart(item: ItemModel)
  {
    this.selectedItem.set(item);
    this.onDragInProgressStart.emit(this.selectedItem());
 //   console.log("dragging start from in-progress" , this.selectedItem())

  }

  dragEnd() {
    let currentLeftOverItems: ItemModel[] | undefined | null = this.inProgressItems()?.filter((item: ItemModel)=>
      { 
        return item.id != this.selectedItem()?.id
      });  
    this.inProgressItems.set(currentLeftOverItems);
    this.selectedItem.set(null);
  
  
  }
  

  
}
