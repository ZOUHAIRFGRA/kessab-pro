export function trimStringWithEllipsis(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }

  return str.slice(0, maxLength) + "...";
}

export function getValue<T = string>(variable: T | null | undefined | "", fallback: string = "-"): T | string {
  if (variable === null || variable === undefined || variable === "") {
    return fallback;
  }
  return variable;
}

export const isValidDDMMYYYY = (dateString: string): boolean => {
  const regex = /^\d{2}-\d{2}-\d{4}$/;

  if (!regex.test(dateString)) {
    return false;
  }

  const [day, month, year] = dateString.split("-").map(Number);

  if (month < 1 || month > 12) {
    return false;
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return false;
  }

  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    return false;
  }

  return true;
};

export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string" && value.trim() === "") {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }

  return false;
};

export type ScreenKey = "ANIMAL" | "BUYER" | "SALE";
export type ScreenName = "AnimalDetails" | "buyerDetail" | "SellDetail";
export type ScreenParam = "animalId" | "buyerId" | "saleId";

export const screenMap: Record<ScreenKey, ScreenName> = {
  ANIMAL: "AnimalDetails",
  BUYER: "buyerDetail",
  SALE: "SellDetail",
};

export const screenParamMap: Record<ScreenName, ScreenParam> = {
  AnimalDetails: "animalId",
  buyerDetail: "buyerId",
  SellDetail: "saleId",
};

export interface QrResult {
  to: ScreenName;
  param: Record<string, string>;
}

export const parseQrResult = (input: string): QrResult | undefined => {
  try {
    const [key, identifier] = input.split("/");
    const screen = screenMap[key as ScreenKey];

    if (!screen) {
      throw Error("Qr not valid");
    }

    const screenParam = screenParamMap[screen];
    return { to: screen, param: { [screenParam]: identifier } };
  } catch (error) {
    alert("Qr code not valid!");
    return undefined;
  }
};
