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

export enum MessageError {
  INVALID_PRIVATE_KEY = 'The private key was invalid',
  ERROR_FIND_BALANCE = 'Could not find XLM balance for this account',
  ERROR_TRANSACTION_HISTORY = 'Could not find transaction history',
}
