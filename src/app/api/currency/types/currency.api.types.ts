export interface NewCurrencyInterface {
  name: string;
  pair: string;
  price: number;
}
export interface CreateCurrencyResponse {
  id: number;
  name: string;
  pair: string;
  price: number;
}
export interface UpdateCurrencyInterface {
  id: number;
  name: string;
  pair: string;
  price: number;
}
export interface UpdateCurrencyResponse {
  id: number;
  name: string;
  pair: string;
  price: number;
}
