export interface Day {
  date: string;
  value: number;
}

export interface Co2Data {
  year: number;
  values: Day[];
}
