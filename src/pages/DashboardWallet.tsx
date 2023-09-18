import Balance from '../components/dashboard/Balance';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import useAuthPublicKey from '../hooks/useAuthPublicKey';
import useLoadAccount from '../hooks/useLoadAccount';

function DashboardWallet() {
  const { publicKey } = useAuthPublicKey();
  const { balance, transactions } = useLoadAccount(publicKey as string);

  return (
    <main
      className="text-stellar-text-primary bg-stellar-bg-primary flex justify-center overflow-hidden"
      data-cy="dashboard-main-container"
    >
      <div className="w-full max-w-7xl">
        <Balance publicKey={publicKey as string} balance={balance as string} />
        <TransactionHistory transactions={transactions} />
      </div>
    </main>
  );
}

export default DashboardWallet;
