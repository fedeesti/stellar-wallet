import { ReactNode, createContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { getPublicKeyFromPrivateKey } from '../service/stellar';
import { IPublicKeyContext } from '../types/types';

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
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (key: string) => {
    const initialLetterOfPrivateKey = 'S';
    const initialLetterOfPublicKey = 'G';

    if (key.charAt(0) === initialLetterOfPrivateKey) {
      const accountPublicKey: string = getPublicKeyFromPrivateKey(key);
      setPublicKey(accountPublicKey);
    }

    if (key.charAt(0) === initialLetterOfPublicKey) {
      setPublicKey(key);
    }

    navigate('/dashboard');
  };

  const handleLogout = () => {
    setPublicKey(null);
  };

  const value: IPublicKeyContext = {
    publicKey,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <PublicKeyContext.Provider value={value}>{children}</PublicKeyContext.Provider>;
}
