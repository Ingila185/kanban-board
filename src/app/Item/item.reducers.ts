import { createReducer, on } from "@ngrx/store";
import { ItemState } from "./item.state";
import { addToDo, loadAllTodos, removeItem, updateItem, updateItemFields } from "./item.actions";
import { ItemModel } from "./item.model";

const allTodosReducer = createReducer(ItemState,
    on(loadAllTodos, (state) => {
        return { ...state }
    }),
    on(addToDo, (state, action) => ({
        ...state,
        allTodoItems: [...state.allTodoItems, action.todoItem], // Spread and add
    })),
    on(updateItem, (state, action)=>({
        ...state, //Spreading existing state to preserver unchanged properties
        allTodoItems: state.allTodoItems.map((item)=>item.id === action.id ? {...item , status: action.status} : item)
    })),

    on(updateItemFields , (state, action)=>({
        ...state,
     //   allTodoItems: state.allTodoItems.map((existingItem)=>(existingItem.id === action.id ? action.item : existingItem))
     allTodoItems: state.allTodoItems.map((item)=>item.id === action.id ? {...item , name: action.name , description: action.description} : item)

    
    })),

    on(removeItem, (state, action)=>({
        ...state,
        allTodoItems: state.allTodoItems.map((item)=>item.id === action.id ? {...item , isActive: false} : item)

    }))
)

export function ToDosReducer(state: any, action: any) {
    return allTodosReducer(state, action)
}