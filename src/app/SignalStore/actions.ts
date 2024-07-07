import { Item } from "../interfaces/item";

interface UpdateItems {
    type: '[Items] Update Items';
    payload: { items: Item[] }; // Payload holds updated items
  }