import { TaskStates } from "../enums/TaskStates";
import { Item } from "../interfaces/item";
export const TO_DO_ITEMS: Item[] =
    [
        {
            id: "2397",
            name: "To-do 1",
            description: "To-Do: Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
            status: TaskStates.Done
        },

        {
            id: "1627",
            name: "To-do 2",
            description: "To-Do: Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
            status: TaskStates.Done
        },

       {
            id: "5349",
            name: "To-do 3",
            description: "To-Do: Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
            status: TaskStates.Done
        },

        {
            id: "2689",
            name: "To-do 4",
            description: "To-Do: Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
            status: TaskStates.Done
        }
]