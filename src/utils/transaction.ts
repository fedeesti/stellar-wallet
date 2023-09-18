import { TransactionType } from './constants';
import { getShorted } from './shortenString';

interface ITransactionAmountAndAddress {
  address: string;
  amount: string;
}

export default function getTransactionAmountAndAddress(
  publicKey: string,
  type: string,
  asset: string,
  destination: string,
  account: string,
  recordAmount: string,
): ITransactionAmountAndAddress {
  let amount = '';
  let address = '';
  const STARTING_BALANCE = '10000.0000000';

  if (
    type === TransactionType.PAYMENT_TYPE &&
    account !== publicKey &&
    asset === TransactionType.ASSET_NATIVE
  ) {
    address = getShorted(account);
    amount = `+${recordAmount} XLM`;
  }

  if (
    type === TransactionType.PAYMENT_TYPE &&
    account === publicKey &&
    asset === TransactionType.ASSET_NATIVE
  ) {
    address = getShorted(destination);
    amount = `-${recordAmount} XLM`;
  }

  if (type === TransactionType.CREATE_ACCOUNT_TYPE) {
    address = 'Fund';
    amount = `+${STARTING_BALANCE} XLM`;
  }

  return { address, amount };
}
