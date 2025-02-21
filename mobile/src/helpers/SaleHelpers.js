import { trimStringWithEllipsis } from "./gloablHelpers";

export function getAnimalCategoryCounts(sale) {
    const categories = sale.animals.map(animal => animal.category.type);
    
    if (categories.length === 1) {
        return categories[0];
    }

    const categoryCounts = categories.reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    return trimStringWithEllipsis(Object.entries(categoryCounts)
    .map(([category, count]) => `${category}: ${count}`)
    .join(', '), 20);
}


