import { Keypair } from 'stellar-sdk';

export function getPublicKeyFromPrivateKey(privateKey: string): string {
  try {
    const keyPair = Keypair.fromSecret(privateKey);
    return keyPair.publicKey();
  } catch (e) {
    throw new Error('The private key was invalid');
  }
}
