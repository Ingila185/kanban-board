import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AllInProgressItems, AllTodoItems, ItemModel } from "./item.model";
import { TaskStates } from "../enums/TaskStates";

const getAllTodosState = createFeatureSelector<AllTodoItems>('item')
const getAllInProgressState = createFeatureSelector<AllInProgressItems>('item')


export const getAllTodoItems = createSelector(getAllTodosState, (state)=>
    {
       return state.allTodoItems
    // return state.allTodoItems.map((item)=>item.status == TaskStates.Done)
    })

export const getAllInProgressItems = createSelector(getAllInProgressState , (state)=>
    {
        return state.allTodoItems.map((item)=>{item.status == TaskStates.InProgress})
    })