import {
  Asset,
  BASE_FEE,
  Keypair,
  Networks,
  Operation,
  Server,
  TransactionBuilder,
} from 'stellar-sdk';

interface ISendPayment {
  signerAccountPublicKey: string;
  destinationId: string;
  amount: string;
}

const server = new Server(import.meta.env.VITE_URL_HORIZON);

export async function sendPayments({
  signerAccountPublicKey,
  destinationId,
  amount,
}: ISendPayment) {
  try {
    const signerAccountKeypair = Keypair.fromSecret(
      'SANEPI74NFPALZ4JOUTRBOUJGVFOFRKRQT2BZN3UR5ULVEN4FJKT7GRF',
    );
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

    transaction.sign(signerAccountKeypair);

    await server.submitTransaction(transaction);
    location.reload();
  } catch (error) {
    throw new Error('Failed to send transaction');
  }
}
