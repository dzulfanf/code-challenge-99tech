// *Type imports*
import type { BoxProps } from '...';

// *Imports*
import { useMemo } from 'react';
import { useWalletBalances, usePrices, WalletRow } from '...';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

const BLOCKCHAIN_PRIORITY: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const DEFAULT_PRIORITY = -99;

/**
 * Returns the priority of a blockchain.
 *
 * @param blockchain - The blockchain identifier.
 * @returns The configured priority, or the default priority for unsupported blockchains.
 */
const getPriority = (blockchain: string): number => {
  return BLOCKCHAIN_PRIORITY[blockchain] ?? DEFAULT_PRIORITY;
};

/**
 * Renders the wallet balances sorted by blockchain priority.
 *
 * @param props - Props forwarded to the wallet container.
 * @returns The wallet balance list.
 */
const WalletPage = (props: BoxProps) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);

        return balancePriority > DEFAULT_PRIORITY && balance.amount > 0;
      })
      .sort(
        (lhs: WalletBalance, rhs: WalletBalance) =>
          getPriority(rhs.blockchain) - getPriority(lhs.blockchain),
      );
  }, [balances]);

  const rows = sortedBalances.map((balance: WalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount;

    return (
      <WalletRow
        key={`${balance.blockchain}-${balance.currency}`}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed()}
      />
    );
  });

  return <div {...props}>{rows}</div>;
};