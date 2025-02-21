export const getPickedUpRatio = (animals) => {
  const total = animals.length;
  const pickedUpCount = animals.filter(
    (animal) => animal.pickUpDate !== null
  ).length;
  return `${pickedUpCount} / ${total}`;
};

export const getPickedUpDate = (animal) => {
  return animal?.pickUpDate !== null ? animal.pickUpDate : "-";
};
