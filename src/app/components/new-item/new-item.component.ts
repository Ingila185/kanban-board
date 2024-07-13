import { Component, OnInit, effect, inject, output } from '@angular/core';
import {CommonModule} from '@angular/common';

import {  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators
 } from '@angular/forms'; 

import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { TaskStates } from '../../enums/TaskStates';
import { Store } from '@ngrx/store';
import { ItemModel } from '../../Item/item.model';
import { addToDo } from '../../Item/item.actions';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [CommonModule, InplaceModule, InputTextModule, ReactiveFormsModule, CardModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss',


})
export class NewItemComponent{
  newItemForm!: FormGroup;
  visible: boolean = false;
  newItem: string = "";

 onItemAdded =  output<any>()

constructor(private formBuilder: FormBuilder, private allTodoStore : Store<{item: ItemModel[]}>)
{
  this.newItemForm = this.formBuilder.group({
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required)
  });

}

  addNewItemFromStore()
  {
    let newItemDescription = this.newItemForm.controls['description'].value;
    let newItemName = this.newItemForm.controls['name'].value;
 
    let newItem : ItemModel = 
    {
     id: (Math.floor(Math.random() * 10000)).toString(), //Random ID Assigned to each Item
     name: newItemName, 
     description: newItemDescription,
     status: TaskStates.ToDo,
     isActive: true
    }
    this.allTodoStore.dispatch(addToDo({todoItem : newItem}));

    this.onItemAdded.emit(true);
    this.newItemForm.reset();
    this.visible = false
    
  }
}
