import { trimStringWithEllipsis } from "./gloablHelpers";
import { t } from "i18next";

export interface AnimalCategory {
  type: string;
  [key: string]: any;
}

export interface SaleAnimal {
  category: AnimalCategory;
  [key: string]: any;
}

export interface Sale {
  animals: SaleAnimal[];
  [key: string]: any;
}

export function getAnimalCategoryCounts(sale: Sale): string {
  const categories = sale.animals.map((animal) => animal.category.type);

  if (categories.length === 1) {
    return t(`common.${categories[0]}`, categories[0]);
  }

  const categoryCounts = categories.reduce((acc: Record<string, number>, category: string) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return trimStringWithEllipsis(
    Object.entries(categoryCounts)
      .map(
        ([category, count]) => `${t(`common.${category}`, category)}: ${count}`
      )
      .join(", "),
    20
  );
}
