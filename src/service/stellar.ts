import { Keypair, Server } from 'stellar-sdk';
import { ServerApi } from 'stellar-sdk/lib/server_api';
import { MessageError } from '../utils/constants';
import mapStellarResponseToTransaction from './stellar/stellarMapper';
import Transaction from '../domain/Transaction';

const server = new Server(import.meta.env.VITE_URL_HORIZON);

export function getPublicKeyFromPrivateKey(privateKey: string): string {
  try {
    const keyPair = Keypair.fromSecret(privateKey);
    return keyPair.publicKey();
  } catch (e) {
    throw new Error(MessageError.INVALID_PRIVATE_KEY);
  }
}

export async function findNativeBalance(signerAccountPublicKey: string): Promise<string> {
  const response = await server.loadAccount(signerAccountPublicKey);
  for (let i = 0; i <= response.balances.length; i++) {
    if (response.balances[i].asset_type === 'native') {
      return parseFloat(response.balances[i].balance).toFixed(7);
    }
  }
  throw new Error(MessageError.ERROR_FIND_BALANCE);
}

export async function loadTransactionHistory(
  signerAccountPublicKey: string,
): Promise<Transaction[]> {
  try {
    const transactions: Transaction[] = [];
    const transactionLimit = 100;

    const { records }: ServerApi.CollectionPage<ServerApi.PaymentOperationRecord> = await server
      .payments()
      .forAccount(signerAccountPublicKey)
      .order('desc')
      .limit(transactionLimit)
      .call();

    records.forEach((record) => {
      transactions.push(mapStellarResponseToTransaction(signerAccountPublicKey, record));
    });

    return transactions;
  } catch (error) {
    throw new Error(MessageError.ERROR_TRANSACTION_HISTORY);
  }
}
