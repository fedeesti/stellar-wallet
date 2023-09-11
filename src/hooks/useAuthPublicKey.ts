import { useContext } from 'react';
import { PublicKeyContext } from '../contexts/PublicKeyContext';

function useAuthPublicKey() {
  return useContext(PublicKeyContext);
}

export default useAuthPublicKey;
