export interface Keypair {
  publicKey: string;
  secretKey: string;
}

interface IContentModal {
  viewWarning: boolean;
  viewSecretKey: boolean;
  viewConfirmGenerate: boolean;
  viewGenerateKeypair: boolean;
}
