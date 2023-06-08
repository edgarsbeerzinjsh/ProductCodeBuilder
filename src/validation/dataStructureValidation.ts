import { JsonDataStructure } from "../interfaces/JsonDataStructure";

export const isValidJsonDataStructure = (data: any): data is JsonDataStructure => {
    if (!data || typeof data !== 'object') {
        return false;
    }

    const { items, varieties } = data;

    if (!Array.isArray(items) || !Array.isArray(varieties)) {
        return false;
    }

    for (const item of items) {
        if (!isValidItem(item)) {
            return false;
        }
    }

    for (const variant of varieties) {
        if (!isValidVariant(variant)) {
            return false;
        }
    }
    
    return true;
}

export function isValidItem(item: any): boolean {
    return (
      typeof item === 'object' &&
      typeof item.code === 'string' &&
      typeof item.description === 'string' &&
      Array.isArray(item.varieties)
    
    );
}

export function isValidVariant(variant: any): boolean {
    return (
      typeof variant === 'object' &&
      typeof variant.code === 'string' &&
      typeof variant.description === 'string' &&
      Array.isArray(variant.options) &&
      variant.options.every(isValidOption)
    );
}

export function isValidOption(option: any): boolean {
    return (
      typeof option === 'object' &&
      typeof option.code === 'string' &&
      typeof option.description === 'string'
    );
}