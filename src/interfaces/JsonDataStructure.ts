import { Items } from "./Items";
import { Variants } from "./Variants";

export interface JsonDataStructure {
    varieties: Variants[];
    items: Items[];
}