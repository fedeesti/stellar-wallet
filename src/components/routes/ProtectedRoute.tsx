import { ReactNode } from 'react';
import useAuthPublicKey from '../../hooks/useAuthPublicKey';
import { Navigate, useLocation } from 'react-router';

interface IProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: IProps) {
  const { publicKey } = useAuthPublicKey();
  const location = useLocation();

  return publicKey ? <>{children}</> : <Navigate to="/" replace state={{ from: location }} />;
}

export default ProtectedRoute;
