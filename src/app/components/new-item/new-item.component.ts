import { Component, OnInit, effect, inject, output } from '@angular/core';
import {CommonModule} from '@angular/common';
import { AllItemsState, AllItemStore } from '../../SignalStore/all-items.store';



import {  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators
 } from '@angular/forms'; 

import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { Item } from '../../interfaces/item';
import { TaskStates } from '../../enums/TaskStates';
import { getState, patchState } from '@ngrx/signals';
import { STATE_SIGNAL } from '@ngrx/signals/src/state-signal';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [CommonModule, InplaceModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css',
  providers: [AllItemStore]


})
export class NewItemComponent implements OnInit{
  newItemForm!: FormGroup;
  readonly store = inject(AllItemStore);
  visible: boolean = false;
  newItem: string = "";

 onItemAdded =  output<any>()

constructor(private formBuilder: FormBuilder)
{
  this.newItemForm = this.formBuilder.group({
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string | null | undefined>('')
  });


  
    effect(() => {
      // 👇 The effect will be re-executed whenever the state changes.
      const state = getState(this.store);
      console.log('Items state changed in New Items', state);
    });

}
 


ngOnInit(): void {    

}

  
  addNewItem()
  {
   let newItemDescription = this.newItemForm.controls['description'].value;
   let newItemName = this.newItemForm.controls['name'].value;

   let newItem : Item = 
   {
    id: (Math.floor(Math.random() * 10000)).toString(), //Random ID Assigned to each Item
    name: newItemName, 
    description: newItemDescription,
    status: TaskStates.ToDo
   }
this.store.addItem(newItem);
//console.log("After Adding item",this.store.items());
this.newItemForm.reset();
this.onItemAdded.emit(this.store.items())


  }
}
