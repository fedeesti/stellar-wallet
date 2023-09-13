export interface Keypair {
  publicKey: string;
  secretKey: string;
}

interface IContentModal {
  viewWarning: boolean;
  viewSecretKey: boolean;
  viewConfirmGenerate: boolean;
  viewGenerateKeypair: boolean;
  viewAlbedoLogin: boolean;
}

export interface IPublicKeyContext {
  publicKey: string | null;
  onLogin: (privateKey: string) => void;
  onLogout: () => void;
}

export interface IBuildPayment {
  destinationId: string;
  amount: string;
}
