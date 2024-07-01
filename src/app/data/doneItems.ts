import { TaskStates } from "../enums/TaskStates";
import { Item } from "../interfaces/item";
export const DONE_ITEMS: Item[] =
    [
        {
            id: "128",
            name: "Done 1",
            description: "Done: Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
            status: TaskStates.InProgress
        },

        {
            id: "8975",
            name: "Done 2",
            description: "Done: Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
            status: TaskStates.InProgress
        },

        {
            id: "3691",
            name: "Done 3",
            description: "Done: Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
            status: TaskStates.InProgress
        },

        {
            id: "4579",
            name: "Done 4",
            description: "Done: Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            status: TaskStates.InProgress
        }
]