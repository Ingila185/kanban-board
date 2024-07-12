import { createAction, props } from "@ngrx/store";
import { ItemModel } from "./item.model";
import { TaskStates } from "../enums/TaskStates";

export const loadAllTodos = createAction("loadAllTodos");
export const addToDo = createAction("addToDo", props<{todoItem: ItemModel}>());
export const updateItem = createAction("updateItem", props<{id: string , status: TaskStates}>());
export const updateItemFields = createAction("updateItemFields", props<{id: string , item: ItemModel}>());
export const removeItem = createAction("removeItem", props<{id: string}>());