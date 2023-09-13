import Balance from '../components/dashboard/Balance';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import useAuthPublicKey from '../hooks/useAuthPublicKey';
import useLoadAccount from '../hooks/useLoadAccount';

function DashboardWallet() {
  const { publicKey } = useAuthPublicKey();
  const { balance } = useLoadAccount(publicKey as string);

  return (
    <main
      className="text-stellar-text-primary bg-stellar-bg-primary"
      data-cy="dashboard-main-container"
    >
      <Balance publicKey={publicKey as string} balance={balance as string} />
      <TransactionHistory />
    </main>
  );
}

export default DashboardWallet;
