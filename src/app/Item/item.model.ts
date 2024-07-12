import { TaskStates } from "../enums/TaskStates";
export interface ItemModel 
{
    id: string;
    name: string;
    description: string;
    status: TaskStates;
    isActive: boolean

}

export interface AllTodoItems
{
    allTodoItems: ItemModel[]
}

export interface AllInProgressItems
{
    allTodoItems: ItemModel[]
}