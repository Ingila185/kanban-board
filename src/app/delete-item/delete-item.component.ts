import { Component, Input, OnInit, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { ItemModel } from '../Item/item.model';
import { removeItem } from '../Item/item.actions';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'delete-item',
  standalone: true,
  imports: [DialogModule, ButtonModule, ToastModule],
  templateUrl: './delete-item.component.html',
  styleUrl: './delete-item.component.css',

})
export class DeleteItemComponent implements OnInit {
  @Input() itemId: string = "";
  isClosed = output<boolean>();

  constructor(private allTodoStore : Store<{item: ItemModel[]}>)
  {}
  
  isVisible: boolean = true;

deleteItem()
{
  this.isVisible = false
  this.allTodoStore.dispatch(removeItem({id: this.itemId}))
  this.isClosed.emit(true);

}

ngOnInit(): void {
console.log(this.itemId)
}

handleCLose()
{
  this.isVisible=false;
  this.isClosed.emit(true);

}


}
