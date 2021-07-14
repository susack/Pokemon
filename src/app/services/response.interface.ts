export interface IResponse<T> {
  count: number;
  next:string;
  previous:string;
  results: string[];
}

export interface IPokResponse<T> {
  name: string;
  height:string;
  weight:string;
  abilities: string[];
}
