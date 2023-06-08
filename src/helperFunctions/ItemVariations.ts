import { Items } from "../interfaces/Items";
import { Variants } from "../interfaces/Variants";

export const ItemVariations = (item: Items | undefined, possibleVariants: Variants[]) => {
    var variants: Variants[] = [];
    if (item) {
        variants = possibleVariants.filter((variant) =>
            item.varieties.includes(variant.code)
        );
    }

    return variants;
};