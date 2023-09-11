import albedo from '@albedo-link/intent';
import useAuthPublicKey from './useAuthPublicKey';

function useLoginWithAlbedo() {
  const { onLogin } = useAuthPublicKey();

  const albedoGetPublicKey = async () => {
    try {
      const albedoResponse = await albedo.publicKey({});
      onLogin(albedoResponse.pubkey);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return { albedoGetPublicKey };
}

export default useLoginWithAlbedo;
