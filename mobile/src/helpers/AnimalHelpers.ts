export interface Animal {
  id: number;
  tag: string;
  sex: string;
  price: number;
  birth_date: string;
  weight: number;
  category_id: number;
  pickUpDate: string | null;
  [key: string]: any;
}

export const getPickedUpRatio = (animals: Animal[]): string => {
  const total = animals.length;
  const pickedUpCount = animals.filter(
    (animal) => animal.pickUpDate !== null
  ).length;
  return `${pickedUpCount} / ${total}`;
};

export const getPickedUpDate = (animal: Animal | undefined): string => {
  return animal?.pickUpDate !== null ? animal?.pickUpDate || "-" : "-";
};
