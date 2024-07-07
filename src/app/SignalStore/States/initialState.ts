import { signalState } from "@ngrx/signals";
import { Item } from "../../interfaces/item";
import { AllItemsState } from "../all-items.store";
import { TaskStates } from "../../enums/TaskStates";


export const ItemState = {
    items: [] as Item[],
  };


  type AllToDoItemType = { todoItem: Item[];};


  export const allToDoItemState = signalState<AllToDoItemType>
  (
    {
      todoItem: [] as Item[]
    }
  )