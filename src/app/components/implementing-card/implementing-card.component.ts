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
import { DragItem } from '../../Interfaces/DragItem';
import { DeleteItemComponent } from '../../delete-item/delete-item.component';
import { EditItemComponent } from '../../edit-item/edit-item.component';

@Component({
  selector: 'app-implementing-card',
  standalone: true,
  imports: [CardModule, ButtonModule, NgFor, NgForOf, DragDropModule, MenuModule, DeleteItemComponent, EditItemComponent],
  templateUrl: './implementing-card.component.html',
  styleUrl: './implementing-card.component.scss',
})
export class ImplementingCardComponent implements OnChanges, OnInit {
  @Input() droppedItem: DragItem | undefined | null;
  onDragInProgressStart = output<DragItem | undefined | null>();
  inProgressItems = signal<ItemModel[] | undefined | null>([]);


  items: MenuItem[] | undefined;
  edit: boolean = false;
  delete: boolean = false;


  constructor(private allTodoStore: Store<{ item: ItemModel[] }>) {


  }
  ngOnInit(): void {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: () => { this.edit = true }
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => { this.delete = true }

          }
        ]
      }
    ];

  }



  ngOnChanges(changes: SimpleChanges): void {
    this.allTodoStore.select(getAllTodoItems).subscribe(res => {
      this.inProgressItems.set(res.filter(item => item.status == TaskStates.InProgress && item.isActive))
    })


  }

  selectedItem = signal<ItemModel | undefined | null>(null);


  handleDrop($event: any) {
    //console.log(this.droppedItem)
    this.allTodoStore.dispatch(updateItem({ id: this.droppedItem?.item?.id!, status: TaskStates.InProgress }))
  }

  dragStart(item: ItemModel) {
    this.selectedItem.set(item);
    this.onDragInProgressStart.emit({item: item , fromComponentId: TaskStates.InProgress});
  }

  dragEnd() {
  /*  let currentLeftOverItems: ItemModel[] | undefined | null = this.inProgressItems()?.filter((item: ItemModel) => {
      return item.id != this.selectedItem()?.id
    });
    this.inProgressItems.set(currentLeftOverItems);
    this.selectedItem.set(null);

*/
  }

  handleCloseDialog($event : boolean)
  {
    this.edit = !$event
    this.delete = !$event
  }

}
