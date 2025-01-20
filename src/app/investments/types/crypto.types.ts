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
  userId: number;
}

export interface CurrencyIdentity {
  id: number;
  name: string;
  pair: string;
  price: number;
}

export interface newCurrency {
  name: string;
  pair: string;
  price: number;
}

export interface newInvestment {
  buyPrice: number;
  currencyInvestment: number;
  currencyId: number;
  userId: number;
}
