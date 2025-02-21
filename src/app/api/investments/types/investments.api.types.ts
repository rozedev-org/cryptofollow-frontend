export interface NewInvestInterface {
  buyPrice: number;
  currencyId: number;
  currencyInvestment: number;
  userId: number;
}
export interface CreateInvestResponse {
  id: number;
  buyPrice: number;
  currencyInvestment: number;
  currencyId: number;
  userId: number;
}
export interface UpdateInvestmentInterface {
  id: number;
  buyPrice: number;
  currencyId: number;
  currencyInvestment: number;
  userId: number;
}
export interface UpdateInvestResponse {
  id: number;
  buyPrice: number;
  currencyInvestment: number;
  currencyId: number;
  userId: number;
}
