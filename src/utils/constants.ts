export const storedKeypairErrorMessage = {
  copied: '',
  notCopied: 'Please confirm that you have copied and stored your secret key',
};

export const errorExceptions = {
  empty: 'empty',
  valid: 'valid',
  invalid: 'invalid',
};

export const errorPrivateKeyMessage = {
  empty: '',
  withoutPrivateKey: 'Please enter your secret key',
  invalid: 'Invalid secret key. Secret keys are uppercase and begin with the letter "S."',
};

export enum TransactionError {
  DESTINATION_ID_EMPTY = 'Please enter a valid Stellar or Federated address',
  INVALID_DESTINATION_ID = 'Stellar address or public key is invalid. Public keys are uppercase and begin with letter "G"',
  AMOUNT_EMPTY = 'Please enter amount',
}
