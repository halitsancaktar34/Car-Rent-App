import { CarType, FilterType } from "../types";

const options = {
  method: "GET",
  headers: {
  },
};
export async function fetchCars(filters: FilterType): Promise<CarType[]> {
  const {
    make = 'bmw',
    model = 'm3',
    limit = '5',
    year = '',
    fuel_type = '',
  } = filters;
  const res = await fetch(
    options
  );
  return await res.json();
};
