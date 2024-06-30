import { TaskStates } from "../enums/TaskStates";
import { Item } from "../interfaces/item";
export const TO_DO_ITEMS: Item[] =
    [
        {
            id: "1234",
            name: "To-do 1",
            description: "To-Do: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",
            status: TaskStates.Done
        },

        {
            id: "2345",
            name: "To-do 2",
            description: "To-Do: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",
            status: TaskStates.Done
        },

        {
            id: "8975",
            name: "To-do 3",
            description: "To-Do: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",
            status: TaskStates.Done
        },

        {
            id: "8965",
            name: "To-do 4",
            description: "To-Do: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",
            status: TaskStates.Done
        }
]