import { ServerApi } from 'stellar-sdk';
import { getShorted, shortenDate } from '../../utils/shortenString';
import getTransactionAmountAndAddress from '../../utils/transaction';
import Transaction from '../../domain/Transaction';

export default function mapStellarResponseToTransaction(
  publicKey: string,
  stellarResponse: ServerApi.OperationRecord,
) {
  const {
    id,
    created_at,
    amount: recordAmount,
    type,
    source_account,
    to,
    starting_balance,
    asset_type,
  } = stellarResponse;

  const { address, amount } = getTransactionAmountAndAddress(
    publicKey,
    type,
    asset_type,
    to,
    source_account,
    recordAmount,
    starting_balance,
  );

  return new Transaction(shortenDate(created_at), getShorted(address), amount, id);
}
