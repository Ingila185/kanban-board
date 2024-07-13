import { createFeatureSelector, createSelector } from "@ngrx/store";
import {  AllTodoItems } from "./item.model";

const getAllTodosState = createFeatureSelector<AllTodoItems>('item')


export const getAllTodoItems = createSelector(getAllTodosState, (state)=>
    {
       return state.allTodoItems
    })
