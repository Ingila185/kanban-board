import { TaskStates } from "../enums/TaskStates";
import { ItemModel } from "../Item/item.model";

export interface DragItem
{
    item: ItemModel,
    fromComponentId: TaskStates 
}