import { useEffect, useState } from 'react';
import { ServerApi } from 'stellar-sdk/lib/server_api';
import { findNativeBalance, loadTransactionHistory } from '../service/stellar';

function useLoadAccount(publicKey: string) {
  const [records, setRecords] = useState<ServerApi.OperationRecord[]>([]);
  const [balance, setBalance] = useState<string>();

  const onAccountLoaded = async () => {
    let accountBalance: string = await findNativeBalance(publicKey);
    const accountRecords: ServerApi.OperationRecord[] = await loadTransactionHistory(publicKey);

    accountBalance = accountBalance ? accountBalance : '0';

    setBalance(accountBalance);
    setRecords(accountRecords);
  };

  useEffect(() => {
    onAccountLoaded();
  }, []);

  return { balance, records };
}

export default useLoadAccount;
