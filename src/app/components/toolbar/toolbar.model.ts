export type User = {
  id: string;
  name: string;
  wallets: Wallets[];
};
type Wallets = {
  id: string;
  amount: number;
  currency: string;
};
