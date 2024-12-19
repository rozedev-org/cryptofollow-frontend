export interface InvestmentIdentity {
  id: number;
  buyPrice: number;
  currency: CurrencyIdentity;
  currencyId: number;
  currencyInvestment: number;
  pairAmount: number;
  pairInvestment: number;
  pairVariation: number;
  percentageVariation: number;
}

export interface CurrencyIdentity {
  id: number;
  name: string;
  price: number;
}
