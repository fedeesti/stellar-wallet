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
  FAILED = 'Failed to send transaction',
  ALBEDO_ERROR = "Couldn't sign the transaction with Albedo",
}

export enum MessageError {
  INVALID_PRIVATE_KEY = 'The private key was invalid',
  ERROR_FIND_BALANCE = 'Could not find XLM balance for this account',
  ERROR_TRANSACTION_HISTORY = 'Could not find transaction history',
}
