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
  startingbalance: string,
): ITransactionAmountAndAddress {
  let amount = '';
  let address = '';

  if (type === 'payment' && account !== publicKey && asset === 'native') {
    address = getShorted(account);
    amount = `+${recordAmount} XLM`;
  }

  if (type === 'payment' && account === publicKey && asset === 'native') {
    address = getShorted(destination);
    amount = `-${recordAmount} XLM`;
  }

  if (type === 'create_account' && asset === 'native') {
    address = 'Fund';
    amount = `Found +${startingbalance} XLM`;
  }

  return { address, amount };
}
