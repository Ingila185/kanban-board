import { Component, Input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
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
import { MenuItem } from 'primeng/api';
import { DeleteItemComponent } from '../../delete-item/delete-item.component';
import { MenuModule } from 'primeng/menu';


@Component({
  selector: 'app-done-card',
  standalone: true,
  imports: [CardModule, ButtonModule, NgFor, NgForOf, DragDropModule, DeleteItemComponent, MenuModule],
  templateUrl: './done-card.component.html',
  styleUrl: './done-card.component.scss'
})
export class DoneCardComponent implements OnInit, OnChanges {
  constructor(private allTodoStore : Store<{item: ItemModel[]}>){}
  allDoneItems = signal<ItemModel[] | undefined | null>(null);
  items: MenuItem[] | undefined;

 
 
  ngOnInit(): void {
    this.items = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Delete',
                  icon: 'pi pi-trash',
                  command: ()=>{ this.delete = true}
              }
          ]
      }
  ];
  }
  @Input() droppedItemToDone :  DragItem | undefined | null;
  selectedItem : ItemModel | null = null;
  onDragStart = output<DragItem>();
  delete: boolean = false;
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
  ngOnChanges(): void {
    this.allTodoStore.select(getAllTodoItems).subscribe(res=>
      {
        this.allDoneItems.set(res.filter(item=> item.status == TaskStates.Done && item.isActive))
      })
  }

  handleCloseDialog($event : boolean)
  {
    this.delete = !$event
  }


}
