import Balance from '../components/dashboard/Balance';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import useAuthPublicKey from '../hooks/useAuthPublicKey';

function DashboardWallet() {
  const { publicKey } = useAuthPublicKey();
  return (
    <main
      className="text-stellar-text-primary bg-stellar-bg-primary"
      data-cy="dashboard-main-container"
    >
      <Balance publicKey={publicKey as string} />
      <TransactionHistory />
    </main>
  );
}

export default DashboardWallet;
