import { useEffect, useState } from 'react';
import { findNativeBalance, loadTransactionHistory } from '../service/stellar';
import Transaction from '../domain/Transaction';

function useLoadAccount(publicKey: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<string>();

  const onAccountLoaded = async () => {
    let accountBalance: string = await findNativeBalance(publicKey);
    const accountTransactions: Transaction[] = await loadTransactionHistory(publicKey);

    accountBalance = accountBalance ? accountBalance : '0';

    setBalance(accountBalance);
    setTransactions(accountTransactions);
  };

  useEffect(() => {
    onAccountLoaded();
  }, []);

  return { balance, transactions };
}

export default useLoadAccount;
