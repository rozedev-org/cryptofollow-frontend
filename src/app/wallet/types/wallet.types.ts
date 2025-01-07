import { CurrencyIdentity } from "@/app/investments/types/crypto.types";


export interface WalletIdentity {
  currency: CurrencyIdentity;
  currencyId: number;
  currencyInvestment: number;
  pairAmount: number;
  pairInvestment: number;
  pairVariation: number;
  percentageVariation: number;
}