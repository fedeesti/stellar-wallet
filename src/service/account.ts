import { Keypair } from 'stellar-sdk';
import { IKeypair } from '../types/types';

export function createAccount(): IKeypair {
  const randomPair = Keypair.random();
  const secretKey: string = randomPair.secret();
  const publicKey: string = randomPair.publicKey();
  return {
    publicKey,
    secretKey,
  };
}
