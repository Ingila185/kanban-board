import { Component, Input, OnInit, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { ItemModel } from '../Item/item.model';
import { getAllTodoItems } from '../Item/item.selectors';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { updateItemFields } from '../Item/item.actions';
import { ItemState } from '../Item/item.state';

@Component({
  selector: 'edit-item',
  standalone: true,
  imports: [ DialogModule , InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css'
})
export class EditItemComponent implements OnInit{
  editItemForm!: FormGroup;
  currentItem  = signal<ItemModel | null>(null)

  constructor(private formBuilder: FormBuilder, private allTodoStore : Store<{item: ItemModel[]}>)
  {
    this.editItemForm = this.formBuilder.group({
      name: new FormControl<string>('', Validators.required),
      description: new FormControl<string>('', Validators.required)
    });
  }
  @Input() itemId: string = "";

 // itemId: string = "";


  ngOnInit(): void {
    if(this.isValidString(this.itemId)){
    this.allTodoStore.select(getAllTodoItems).subscribe(
      (res)=>
        {

          let currentItem = res.filter((item)=>item.id == this.itemId && item.isActive)
          if(currentItem.length > 0){
          this.currentItem.set(currentItem[0]);

          this.editItemForm.controls['name'].setValue(currentItem[0].name)
          this.editItemForm.controls['description'].setValue(currentItem[0].description)

         //console.log(currentItem )
        }}
    )
  }


  }

  editItem()
  {
    this.isVisible = false;

    console.log(this.itemId , this.currentItem())
    this.allTodoStore.dispatch(updateItemFields({id: this.itemId, item: this.currentItem()!}))
  }
  
isVisible: boolean = true;

isValidString(str: string): boolean {
  return typeof str === 'string' && str !== null && str !== undefined;
}
}
