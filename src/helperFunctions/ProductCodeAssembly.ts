export const ProductCodeAssembly = (ElementsOfCode: { [key: string]: string }) => {
    const keysOfCode = Object.keys(ElementsOfCode);
    const itemCode = keysOfCode.shift();
    const variantCode = keysOfCode.sort();

    return [
        ElementsOfCode[itemCode!],
        ...variantCode.map((part) => ElementsOfCode[part]),
    ].join(".");
};