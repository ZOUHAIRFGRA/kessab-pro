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
