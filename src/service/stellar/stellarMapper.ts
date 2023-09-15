import { ServerApi } from 'stellar-sdk';
import { shortenDate } from '../../utils/shortenString';
import getTransactionAmountAndAddress from '../../utils/transaction';
import Transaction from '../../domain/Transaction';
import { getRandomProfile } from '../../utils/profile';

export default function mapStellarResponseToTransaction(
  publicKey: string,
  stellarResponse: ServerApi.OperationRecord,
): Transaction {
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

  const profile = getRandomProfile();
  const date = shortenDate(created_at);

  return new Transaction(date, profile, address, amount, id);
}
