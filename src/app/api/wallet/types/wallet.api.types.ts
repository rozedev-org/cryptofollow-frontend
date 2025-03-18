import { CreateCurrencyResponse } from "../../currency/types/currency.api.types";

export interface WalletResponse {
  currency: CreateCurrencyResponse;
  currencyId: number;
  currencyInvestment: number;
  pairAmount: number;
  pairInvestment: number;
  pairVariation: number;
  percentageVariation: number;
}
export interface BalanceResponse {
  balance: number;
}
