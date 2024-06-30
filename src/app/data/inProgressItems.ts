import { TaskStates } from "../enums/TaskStates";
import { Item } from "../interfaces/item";
export const IN_PROGRESS_ITEMS: Item[] =
    [
        {
            id: "7895",
            name: "In-Progress 1",
            description: "In-Progress: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",
            status: TaskStates.InProgress
        },

        {
            id: "3648",
            name: "In-Progress 2",
            description: "In-Progress: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",
            status: TaskStates.InProgress
        },

        {
            id: "1289",
            name: "In-Progress 3",
            description: "In-Progress Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",
            status: TaskStates.InProgress
        },

        {
            id: "4579",
            name: "In-Progress 4",
            description: "In-Progress: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",
            status: TaskStates.InProgress
        }
]