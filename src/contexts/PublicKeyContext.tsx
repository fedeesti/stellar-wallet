import { ReactNode, createContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { getPublicKeyFromPrivateKey } from '../service/stellar';
import { IPublicKeyContext } from '../types/types';
import { decrypt, encrypt } from '../service/security/security';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveInLocalStorage,
} from '../service/storage/storage';

interface IProps {
  children: ReactNode;
}

const INITIAL_VALUE_CONTEXT: IPublicKeyContext = {
  publicKey: null,
  onLogin: () => {},
  onLogout: () => {},
};

export const PublicKeyContext = createContext<IPublicKeyContext>(INITIAL_VALUE_CONTEXT);

export default function AuthPublicKeyProvider({ children }: IProps) {
  const SECRET_KEY = import.meta.env.VITE_SAVE_PRIVATE_KEY;
  const PUBLIC_KEY = import.meta.env.VITE_SAVE_PUBLIC_KEY;

  const encryptedPublicKey = getFromLocalStorage(PUBLIC_KEY);

  if (encryptedPublicKey) {
    INITIAL_VALUE_CONTEXT.publicKey = decrypt(encryptedPublicKey);
  }

  const [publicKey, setPublicKey] = useState<string | null>(INITIAL_VALUE_CONTEXT.publicKey);
  const navigate = useNavigate();

  const handleLogin = (key: string) => {
    const initialLetterOfPrivateKey = 'S';
    const initialLetterOfPublicKey = 'G';

    if (key.charAt(0) === initialLetterOfPrivateKey) {
      const accountPublicKey: string = getPublicKeyFromPrivateKey(key);
      saveInLocalStorage(SECRET_KEY, encrypt(key));
      saveInLocalStorage(PUBLIC_KEY, encrypt(accountPublicKey));
      setPublicKey(accountPublicKey);
    }

    if (key.charAt(0) === initialLetterOfPublicKey) {
      setPublicKey(key);
      saveInLocalStorage(PUBLIC_KEY, encrypt(key));
    }

    navigate('/dashboard');
  };

  const handleLogout = () => {
    setPublicKey(null);
    removeFromLocalStorage(PUBLIC_KEY);
    removeFromLocalStorage(SECRET_KEY);
  };

  const value: IPublicKeyContext = {
    publicKey,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <PublicKeyContext.Provider value={value}>{children}</PublicKeyContext.Provider>;
}
