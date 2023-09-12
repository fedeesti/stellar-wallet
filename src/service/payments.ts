import {
  Asset,
  BASE_FEE,
  Keypair,
  Networks,
  Operation,
  Server,
  TransactionBuilder,
} from 'stellar-sdk';
import { decrypt } from './security/security';

interface ISendPayment {
  signerAccountPublicKey: string;
  destinationId: string;
  amount: string;
}

const server = new Server(import.meta.env.VITE_URL_HORIZON);

export async function sendPaymentWithSecretKey({
  signerAccountPublicKey,
  destinationId,
  amount,
}: ISendPayment) {
  try {
    const privateKey = decrypt(localStorage.getItem('secret') as string);
    const signerKeypair = Keypair.fromSecret(privateKey);

    const signerAccount = await server.loadAccount(signerAccountPublicKey);

    const transaction = new TransactionBuilder(signerAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: destinationId,
          asset: Asset.native(),
          amount: amount.toString(),
        }),
      )
      .setTimeout(180)
      .build();

    transaction.sign(signerKeypair);

    return await server.submitTransaction(transaction);
  } catch (error) {
    throw new Error('Failed to send transaction');
  }
}
