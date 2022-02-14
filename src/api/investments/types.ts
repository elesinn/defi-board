type NumberString = string; // numbers as strings "2", "23142", etc.

export interface IInvestment {
  active: boolean;
  firstLevel: number;
  hash: string;
  id: number;
  key: string;
  lastLevel: number;
  updates: number;
  value:
    | {
        InvestMap: Record<
          number,
          { level: NumberString; amount: NumberString }
        >;
        balance: string;
        counter: NumberString; // "5"
        rewards: NumberString; // "0"
        userRewardPerTokenPaid: string;
      }
    | NumberString;
}
