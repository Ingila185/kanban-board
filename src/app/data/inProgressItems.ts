import { TaskStates } from "../enums/TaskStates";
import { Item } from "../interfaces/item";
export const IN_PROGRESS_ITEMS: Item[] =
    [
        {
            id: "7895",
            name: "In-Progress 1",
            description: "In-Progress: Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            status: TaskStates.InProgress
        },

        {
            id: "3648",
            name: "In-Progress 2",
            description: "In-Progress: Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            status: TaskStates.InProgress
        },

      {
            id: "1289",
            name: "In-Progress 3",
            description: "In-Progress Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
            status: TaskStates.InProgress
        },

       {
            id: "2148",
            name: "In-Progress 4",
            description: "In-Progress: Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
            status: TaskStates.InProgress
        }
]