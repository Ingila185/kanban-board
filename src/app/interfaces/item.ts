import { TaskStates } from "../enums/TaskStates";
export interface Item 
{
    id: string;
    name: string;
    description: string;
    status: TaskStates;

}