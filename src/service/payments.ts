import {
  Account,
  Asset,
  BASE_FEE,
  Keypair,
  Networks,
  Operation,
  Server,
  TransactionBuilder,
} from 'stellar-sdk';
import albedo from '@albedo-link/intent';
import { decrypt } from './security/security';
import { TransactionError } from '../utils/constants';
import { ISendPayment } from '../types/types';

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
    throw new Error(TransactionError.FAILED);
  }
}

export async function sendPaymentWithAlbedo({
  signerAccountPublicKey,
  destinationId,
  amount,
}: ISendPayment) {
  try {
    const { sequence } = await server.loadAccount(signerAccountPublicKey);
    const signerAccount = new Account(signerAccountPublicKey, sequence);

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

    const transactionXdr = transaction.toXDR();

    const { signed_envelope_xdr } = await albedo.tx({
      xdr: transactionXdr,
      network: Networks.TESTNET,
    });

    if (!signed_envelope_xdr) {
      throw new Error(TransactionError.ALBEDO_ERROR);
    }

    const signedTransaction = TransactionBuilder.fromXDR(signed_envelope_xdr, Networks.TESTNET);

    return await server.submitTransaction(signedTransaction);
  } catch (e) {
    throw new Error(TransactionError.FAILED);
  }
}
