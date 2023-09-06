import { Keypair, Server } from 'stellar-sdk';
import { ServerApi } from 'stellar-sdk/lib/server_api';

const server = new Server(import.meta.env.VITE_URL_HORIZON);

export function getPublicKeyFromPrivateKey(privateKey: string): string {
  try {
    const keyPair = Keypair.fromSecret(privateKey);
    return keyPair.publicKey();
  } catch (e) {
    throw new Error('The private key was invalid');
  }
}

export async function loadTransactionHistory(
  signerAccountPublicKey: string,
): Promise<ServerApi.OperationRecord[]> {
  try {
    const transactionLimit = 100;

    const transaction: ServerApi.CollectionPage<ServerApi.PaymentOperationRecord> = await server
      .payments()
      .forAccount(signerAccountPublicKey)
      .order('desc')
      .limit(transactionLimit)
      .call();

    return transaction.records;
  } catch (error) {
    throw new Error('Could not find transaction history');
  }
}
