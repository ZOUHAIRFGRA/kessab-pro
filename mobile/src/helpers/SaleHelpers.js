import { trimStringWithEllipsis } from "./gloablHelpers";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

export function getAnimalCategoryCounts(sale) {
  const categories = sale.animals.map((animal) => animal.category.type);

  if (categories.length === 1) {
    return t(`common.${categories[0]}`, categories[0]);
  }

  const categoryCounts = categories.reduce((acc, category) => {
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
