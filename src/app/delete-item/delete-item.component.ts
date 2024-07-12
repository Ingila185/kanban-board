import { Component, Input, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { ItemModel } from '../Item/item.model';
import { removeItem } from '../Item/item.actions';

@Component({
  selector: 'delete-item',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './delete-item.component.html',
  styleUrl: './delete-item.component.css'
})
export class DeleteItemComponent implements OnInit {
  @Input() itemId: string = "";

  constructor(private allTodoStore : Store<{item: ItemModel[]}>)
  {}
  
  isVisible: boolean = true;

deleteItem()
{
  this.isVisible = false
  this.allTodoStore.dispatch(removeItem({id: this.itemId}))
}

ngOnInit(): void {
console.log(this.itemId)
}



}
