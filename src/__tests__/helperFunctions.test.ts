import { testItems } from "../_testMockData/testItems"
import { testVariants } from "../_testMockData/testVariants";
import { ItemVariations } from "../helperFunctions/ItemVariations"
import { ProductCodeAssembly } from "../helperFunctions/ProductCodeAssembly";

describe("Helper functions", () => {
    it("Item variations: should return the correct item variation - 1", () => {
        var item = testItems[1];
        var variants = testVariants;

        const variations = ItemVariations(item, variants)

        expect(variations.length).toBe(1)
        expect(variations[0].code).toBe("A")
    })

    it("Item variations: should return the correct item variation - 0", () => {
        var item = testItems[0];
        var variants = testVariants;

        const variations = ItemVariations(item, variants)

        expect(variations).toEqual([])
    })

    
    it("Item variations: should return the correct item variation - 2", () => {
        var item = testItems[2];
        var variants = testVariants;

        const variations = ItemVariations(item, variants)

        expect(variations.length).toBe(2)
        expect(variations[0].code).toBe("A")
        expect(variations[1].code).toBe("B")
    })

    it("Product code assembly: should assemble correct code", () => {
        var preparedCode = {
            c: "C",
            o: "O",
            d: "D",
            e: "E",
            t: "T",
            a: "A",
        };

        const code = ProductCodeAssembly(preparedCode)

        expect(code).toEqual("C.A.D.E.O.T")
    })
})