export function trimStringWithEllipsis(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }

  return str.slice(0, maxLength) + "...";
}

export function getValueWithFallback(variable, fallback = "-") {
  if (variable === null || variable === undefined || variable === "") {
    return fallback;
  }
  return variable;
}

export const isValidDDMMYYYY = (dateString) => {
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

export const isEmpty = (value) => {
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

const screenMap = {
  ANIMAL: "AnimalDetails",
  BUYER: "buyerDetail",
  SALE: "SellDetail",
};

const parseAndNavigate = (navigate) => (input) => {
  const [key, uuid] = input.split("/");
  const screen = screenMap[key];

  if (!screen) {
    console.error(`No screen found for key: ${key}`);
    return;
  }

  navigate(screen, { uuid });
};
