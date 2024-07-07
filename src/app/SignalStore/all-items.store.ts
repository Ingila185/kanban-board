import { signalStore, withState, withMethods, patchState, signalState  } from '@ngrx/signals';
import { allToDoItemState, ItemState } from './States/initialState';
import { Item } from '../interfaces/item';
import { Signal } from '@ngrx/signals/src/deep-signal';
import { TaskStates } from '../enums/TaskStates';
import { computed, effect } from '@angular/core';

export type AllItemsState = Item[] | null;  // Union type for initial state


interface AddNewItem 
{
  type: '[Items] Add New Item',
  payload: {items: Item[]}

}




export const AllItemStore = signalStore
(
  { providedIn: 'root' },
  
  withState(ItemState),
  withState(allToDoItemState),

  withMethods((store)=>
    ({
        addItem(newItem : Item): void
        {

            patchState(store, {items: [...store.items() , newItem]} )
            patchState(store, {todoItem : [...store.items() , newItem]})
            console.log(store.items() , store.todoItem())
        },
        getAllItems(): Item[]
        {
          //return ItemState.items;
          
        
          console.log(store.todoItem())
          console.log(store.items())

          return store.items();




        },

        updateItemStatus(itemId: string, status: TaskStates) : void
        {
          console.log("id from store update()", itemId , status,  [...store.items()], ItemState.items , store.todoItem(), allToDoItemState.todoItem())
          patchState(store, {items: {...store.items() , }})
          console.log(store.items() , store.todoItem(), this.getAllItems())


         /* const items = [...store.items()]; // Get all items using existing method
          console.log("Items State from store update() and Effect()", items)
          return ItemState.items.map((item)=>
            {
              return item.id === itemId ? {...item, status: status} : item
            })
        
        */



//patchState(store, {items: [...store.items(), ]})
        
        
        }
      
    } 
  ), 
  )
);




