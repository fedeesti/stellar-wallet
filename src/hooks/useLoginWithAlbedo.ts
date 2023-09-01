import albedo from '@albedo-link/intent';
import { useState } from 'react';

function useLoginWithAlbedo() {
  const [publicKey, setPublicKey] = useState<string>();

  const albedoGetPublicKey = async () => {
    try {
      const albedoResponse = await albedo.publicKey({});
      setPublicKey(albedoResponse.pubkey);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return { albedoGetPublicKey, publicKey };
}

export default useLoginWithAlbedo;
